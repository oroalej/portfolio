"use client";

import { CardBody, CardRoot } from "@/components";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import {
  GalleryItem,
  GalleryItemLoading,
} from "@/app/admin/(modules)/gallery/_components/GalleryItem";
import GalleryWrapper, {
  GalleryWrapperProps,
} from "@/app/admin/(modules)/gallery/_components/GalleryWrapper";

const cols = 6;

export const GalleryList = () => {
  const params = useParams();

  return (
    <CardRoot rounded className="flex-1">
      <CardBody>
        <GalleryWrapper
          cols={cols}
          per_page={12}
          activeId={(params?.imageId ?? "") as string}
          isCategoryFilterVisible={true}
          childLoadingIndicator={GalleryItemLoading}
        >
          {({ item }) => (
            <Suspense
              fallback={<GalleryItemLoading />}
              key={`gallery-image-${item.id}`}
            >
              <GalleryItem
                item={item}
                isSelected={params?.imageId === item.id}
              />
            </Suspense>
          )}
        </GalleryWrapper>
      </CardBody>
    </CardRoot>
  );
};

export type GalleryListLoadingProps = {} & Pick<GalleryWrapperProps, "cols">;

export const GalleryListLoading = ({ cols }: GalleryListLoadingProps) => (
  <CardRoot rounded className="flex-1">
    <CardBody
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {[...Array(2)].map((_, index) => (
        <GalleryItemLoading key={`gallery-image-loading-${index}`} />
      ))}
    </CardBody>
  </CardRoot>
);
