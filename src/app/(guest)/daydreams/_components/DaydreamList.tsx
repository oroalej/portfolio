"use client";

import { Fragment, Suspense, useEffect } from "react";
import { SimplePagination } from "@/components";
import { useOpenable } from "@/hooks";
import { useGalleryContext } from "@/context/GalleryContext";
import {
  DaydreamCard,
  DaydreamCardLoading,
} from "@/app/(guest)/daydreams/_components/DaydreamCard";
import { PreviewDreamDialog } from "@/app/(guest)/daydreams/_components/PreviewDreamDialog";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";
import { useSearchParams } from "next/navigation";
import { useGetDaydreamList } from "@/features/daydreams/api";

const DaydreamList = () => {
  const searchParams = useSearchParams();

  const { setList, setSelectedIndex, selectedIndex } = useGalleryContext();
  const { isOpen, onOpen, onClose } = useOpenable();
  const { setParam, push } = useSetParamsRouter();

  const { isLoading, isFetching, data } = useGetDaydreamList({
    per_page:
      Number(searchParams.get("per_page")) ||
      DEFAULT_PAGINATION_VALUES.per_page,
    page:
      Number(searchParams.get("page")) ||
      DEFAULT_PAGINATION_VALUES.current_page,
    sort: [
      { column: "year", order: "desc" },
      { column: "created_at", order: "desc" },
    ],
  });

  useEffect(() => {
    setList(data?.data ?? []);
  }, [data?.data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isFetching]);

  const onSelectHandler = (index: number) => {
    setSelectedIndex(index);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <DaydreamCardLoading key={`daydream-loader-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <Fragment>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {data?.data.map((item, index) => (
          <Suspense
            key={`image-${item.id}-${index}`}
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
          <div className="text-center col-span-2">
            {"I'm sorry, I haven't uploaded yet..."}
          </div>
        )}
      </div>

      {Number.isInteger(selectedIndex) && (
        <PreviewDreamDialog onClose={onClose} isOpen={isOpen} />
      )}

      {data?.pagination && data.pagination.last_page !== 1 && (
        <div className="flex justify-center my-16">
          <SimplePagination
            onChange={(value) => {
              setParam("page", value);
              push();
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
export default DaydreamList;
