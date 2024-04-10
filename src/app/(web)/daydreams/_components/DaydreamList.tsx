"use client";

import { useGetDaydreamList } from "@/features/daydreams/api";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { useQueryState } from "next-usequerystate";
import { Fragment, Suspense, useEffect } from "react";
import { SimplePagination } from "@/components";
import {
  DaydreamCard,
  DaydreamCardLoading,
} from "@/app/(web)/daydreams/_components/DaydreamCard";
import { useGalleryContext } from "@/context/GalleryContext";
import { useOpenable } from "@/hooks";
import { DaydreamGalleryItemTransformer } from "@/features/daydreams/transformers";
import DaydreamPreviewDialog from "@/app/(web)/daydreams/_components/DaydreamPreviewDialog";

export const DaydreamList = () => {
  const { setList, setSelectedIndex, selectedIndex } = useGalleryContext();
  const { isOpen, onOpen, onClose } = useOpenable();

  const [page, setPage] = useQueryState("per_page", {
    parse: parseInt,
    shallow: false,
    defaultValue: DEFAULT_PAGINATION_VALUES.current_page,
  });

  const { isLoading, isFetching, data } = useGetDaydreamList({
    per_page: 21,
    page: page,
    sort: [
      { column: "year", order: "desc" },
      { column: "created_at", order: "desc" },
    ],
  });

  const onSelectHandler = (index: number) => {
    setSelectedIndex(index);
    onOpen();
  };

  useEffect(() => {
    setList(data?.data.map(DaydreamGalleryItemTransformer) ?? []);
  }, [data?.data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isFetching]);

  if (isLoading) {
    return <DaydreamListLoading />;
  }

  return (
    <Fragment>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((item, index) => (
          <Suspense
            key={`daydream-${item.id}-${index}`}
            fallback={<DaydreamCardLoading />}
          >
            <DaydreamCard
              image_path={item.file.storage_file_path}
              iso={item.iso}
              shutter_speed={item.shutter_speed}
              aperture={item.aperture}
              year={item.year}
              description={item.description}
              onSelect={() => onSelectHandler(index)}
            />
          </Suspense>
        )) ?? (
          <div className="text-center col-span-3">
            {"I'm sorry, I haven't uploaded yet..."}
          </div>
        )}
      </div>

      {Number.isInteger(selectedIndex) && data?.data && (
        <DaydreamPreviewDialog
          isOpen={isOpen}
          onClose={onClose}
          year={data.data[selectedIndex || 0].year}
          description={data.data[selectedIndex || 0].description}
          aperture={data.data[selectedIndex || 0].aperture}
          iso={data.data[selectedIndex || 0].iso}
          shutter_speed={data.data[selectedIndex || 0].shutter_speed}
        />
      )}

      {data?.pagination && data.pagination.last_page !== 1 && (
        <div className="flex justify-center my-16">
          <SimplePagination
            onChange={(value) => {
              setPage(value).catch();
            }}
            current_page={data.pagination.current_page}
            last_page={data.pagination.last_page}
            size="large"
          />
        </div>
      )}
    </Fragment>
  );
};

export const DaydreamListLoading = () => (
  <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <DaydreamCardLoading key={`daydream-loader-${index}`} />
    ))}
  </div>
);
