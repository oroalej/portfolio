"use client";

import { CardBody, CardFooter, CardRoot, SimplePagination } from "@/components";
import { useParams } from "next/navigation";
import { useFileList } from "@/features/files/api/getFileList";
import { Suspense } from "react";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import GalleryItemLoading from "@/app/admin/(modules)/gallery/_components/Loading/GalleryItemLoading";
import GalleryListLoading from "@/app/admin/(modules)/gallery/_components/Loading/GalleryListLoading";
import GalleryItem from "@/app/admin/(modules)/gallery/_components/GalleryItem";
import { useQueryState } from "next-usequerystate";

const GalleryList = () => {
  const params = useParams();

  const [page, setPage] = useQueryState("per_page", {
    parse: parseInt,
    shallow: false,
    defaultValue: DEFAULT_PAGINATION_VALUES.current_page,
  });

  const { isLoading, data } = useFileList({
    bucket_name: "images",
    per_page: DEFAULT_PAGINATION_VALUES.per_page,
    page,
  });

  if (isLoading) {
    return <GalleryListLoading />;
  }

  return (
    <CardRoot rounded className="flex-1">
      <CardBody className="grid grid-cols-5 gap-3 flex-wrap">
        {data?.data.map((item, index) => (
          <Suspense
            fallback={<GalleryItemLoading />}
            key={`gallery-image-${item.id}-${index}`}
          >
            <GalleryItem item={item} isSelected={params?.imageId === item.id} />
          </Suspense>
        ))}
      </CardBody>

      {data?.pagination && (
        <CardFooter className="justify-end">
          <SimplePagination
            onChange={(value) => {
              setPage(value).catch();
            }}
            current_page={data?.pagination.current_page}
            last_page={data?.pagination.last_page}
          />
        </CardFooter>
      )}
    </CardRoot>
  );
};

export default GalleryList;
