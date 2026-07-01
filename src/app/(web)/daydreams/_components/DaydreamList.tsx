"use client";

import { useInfiniteDaydreamList } from "@/features/daydreams/api";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DaydreamCard,
  DaydreamCardLoading,
} from "@/app/(web)/daydreams/_components/DaydreamCard";
import { useGalleryContext } from "@/context/GalleryContext";
import { useOpenable } from "@/hooks";
import { DaydreamGalleryItemsTransformer } from "@/features/daydreams/transformers";
import DaydreamPreviewDialog from "@/app/(web)/daydreams/_components/DaydreamPreviewDialog";

export const DaydreamList = () => {
  const { selectedIndex, setList, setSelectedIndex } = useGalleryContext();
  const { isOpen, onOpen, onClose } = useOpenable();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [selectedDaydreamIndex, setSelectedDaydreamIndex] = useState<
    number | null
  >(null);
  const [isPreviewNextLoading, setIsPreviewNextLoading] = useState(false);
  const [previewNextError, setPreviewNextError] = useState<string | null>(null);

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
  const currentImageIndex = selectedIndex ?? 0;
  const selectedDaydreamLastImageIndex = Math.max(
    (selectedDaydream?.images.length ?? 0) - 1,
    0
  );
  const hasLoadedNextDaydream =
    selectedDaydreamIndex !== null &&
    selectedDaydreamIndex < daydreams.length - 1;
  const canFetchNextDaydream =
    !!hasNextPage && !isFetchingNextPage && !isPreviewNextLoading;
  const isPreviewPreviousDisabled =
    !selectedDaydream ||
    selectedDaydreamIndex === null ||
    (selectedDaydreamIndex <= 0 && currentImageIndex <= 0);
  const isPreviewNextDisabled =
    !selectedDaydream ||
    selectedDaydreamIndex === null ||
    (currentImageIndex >= selectedDaydreamLastImageIndex &&
      !hasLoadedNextDaydream &&
      !canFetchNextDaydream);

  const onSelectHandler = (index: number) => {
    const selectedDaydream = daydreams[index];

    if (!selectedDaydream) return;

    setPreviewNextError(null);
    setSelectedDaydreamIndex(index);
    setList(DaydreamGalleryItemsTransformer(selectedDaydream));
    onOpen();
  };

  const onPreviewNextHandler = useCallback(async () => {
    if (!selectedDaydream || selectedDaydreamIndex === null) return;

    if (currentImageIndex < selectedDaydreamLastImageIndex) {
      setPreviewNextError(null);
      setSelectedIndex(currentImageIndex + 1);
      return;
    }

    const nextDaydreamIndex = selectedDaydreamIndex + 1;
    const nextDaydream = daydreams[nextDaydreamIndex];

    if (nextDaydream) {
      setPreviewNextError(null);
      setSelectedDaydreamIndex(nextDaydreamIndex);
      setList(DaydreamGalleryItemsTransformer(nextDaydream));
      setSelectedIndex(0);
      return;
    }

    if (!hasNextPage || isFetchingNextPage || isPreviewNextLoading) return;

    try {
      setIsPreviewNextLoading(true);
      setPreviewNextError(null);

      const nextPageResult = await fetchNextPage();
      const fetchedDaydreams =
        nextPageResult.data?.pages.flatMap((page) => page.data) ?? daydreams;
      const fetchedNextDaydream = fetchedDaydreams[nextDaydreamIndex];

      if (!fetchedNextDaydream) {
        setPreviewNextError("Unable to load the next daydream. Try again.");
        return;
      }

      setSelectedDaydreamIndex(nextDaydreamIndex);
      setList(DaydreamGalleryItemsTransformer(fetchedNextDaydream));
      setSelectedIndex(0);
      setPreviewNextError(null);
    } catch {
      setPreviewNextError("Unable to load the next daydream. Try again.");
    } finally {
      setIsPreviewNextLoading(false);
    }
  }, [
    currentImageIndex,
    daydreams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPreviewNextLoading,
    selectedDaydream,
    selectedDaydreamLastImageIndex,
    selectedDaydreamIndex,
    setList,
    setSelectedIndex,
  ]);

  const onPreviewPreviousHandler = useCallback(() => {
    if (!selectedDaydream || selectedDaydreamIndex === null) return;

    if (currentImageIndex > 0) {
      setPreviewNextError(null);
      setSelectedIndex(currentImageIndex - 1);
      return;
    }

    const previousDaydreamIndex = selectedDaydreamIndex - 1;
    const previousDaydream = daydreams[previousDaydreamIndex];

    if (!previousDaydream) return;

    setPreviewNextError(null);
    setSelectedDaydreamIndex(previousDaydreamIndex);
    setList(DaydreamGalleryItemsTransformer(previousDaydream));
    setSelectedIndex(Math.max(previousDaydream.images.length - 1, 0));
  }, [
    currentImageIndex,
    daydreams,
    selectedDaydream,
    selectedDaydreamIndex,
    setList,
    setSelectedIndex,
  ]);

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
          isNextDisabled={isPreviewNextDisabled}
          isNextLoading={isPreviewNextLoading}
          isPreviousDisabled={isPreviewPreviousDisabled}
          onNext={onPreviewNextHandler}
          nextError={previewNextError}
          shutter_speed={selectedDaydream.shutter_speed}
          onPrevious={onPreviewPreviousHandler}
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
