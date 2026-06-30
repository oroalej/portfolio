"use client";

import { useInfiniteDaydreamList } from "@/features/daydreams/api";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  DaydreamCard,
  DaydreamCardLoading,
} from "@/app/(web)/daydreams/_components/DaydreamCard";
import { useGalleryContext } from "@/context/GalleryContext";
import { useOpenable } from "@/hooks";
import { DaydreamGalleryItemsTransformer } from "@/features/daydreams/transformers";
import DaydreamPreviewDialog from "@/app/(web)/daydreams/_components/DaydreamPreviewDialog";

export const DaydreamList = () => {
  const { setList } = useGalleryContext();
  const { isOpen, onOpen, onClose } = useOpenable();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [selectedDaydreamIndex, setSelectedDaydreamIndex] = useState<
    number | null
  >(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDaydreamList({
    per_page: 21,
    page: DEFAULT_PAGINATION_VALUES.current_page,
    sort: [
      { column: "year", order: "desc" },
      { column: "created_at", order: "desc" },
    ],
  });

  const daydreams = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );

  const selectedDaydream = Number.isInteger(selectedDaydreamIndex)
    ? daydreams[selectedDaydreamIndex ?? 0]
    : undefined;

  const onSelectHandler = (index: number) => {
    const selectedDaydream = daydreams[index];

    if (!selectedDaydream) return;

    setSelectedDaydreamIndex(index);
    setList(DaydreamGalleryItemsTransformer(selectedDaydream));
    onOpen();
  };

  useEffect(() => {
    if (!isOpen || !selectedDaydream) return;

    setList(DaydreamGalleryItemsTransformer(selectedDaydream), {
      shouldResetSelectedIndex: false,
    });
  }, [isOpen, selectedDaydream, setList]);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage().catch();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <DaydreamListLoading />;
  }

  return (
    <>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {daydreams.length ? (
          daydreams.map((item, index) => (
            <Suspense
              key={`daydream-${item.id}-${index}`}
              fallback={<DaydreamCardLoading />}
            >
              <DaydreamCard
                image_path={item.images[0]?.file.storage_file_path}
                image_count={item.images.length}
                iso={item.iso}
                shutter_speed={item.shutter_speed}
                aperture={item.aperture}
                year={item.year}
                description={item.description}
                onSelect={() => onSelectHandler(index)}
              />
            </Suspense>
          ))
        ) : (
          <div className="text-center col-span-3">
            {"I'm sorry, I haven't uploaded yet..."}
          </div>
        )}

        {isFetchingNextPage &&
          [...Array(3)].map((_, index) => (
            <DaydreamCardLoading key={`daydream-fetching-${index}`} />
          ))}
      </div>

      {selectedDaydream && (
        <DaydreamPreviewDialog
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedDaydreamIndex(null);
          }}
          year={selectedDaydream.year}
          description={selectedDaydream.description}
          aperture={selectedDaydream.aperture}
          iso={selectedDaydream.iso}
          shutter_speed={selectedDaydream.shutter_speed}
        />
      )}

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="h-1 w-full my-16"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export const DaydreamListLoading = () => (
  <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <DaydreamCardLoading key={`daydream-loader-${index}`} />
    ))}
  </div>
);
