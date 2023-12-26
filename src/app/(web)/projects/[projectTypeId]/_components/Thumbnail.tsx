"use client";

import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { useLoadable } from "@/hooks";
import { FC } from "react";
import { GalleryItem } from "@/context/GalleryContext";

export interface ThumbnailInterface {
  image: GalleryItem;
  isActive: boolean;
  onSelect?: () => void;
}

export const Thumbnail: FC<ThumbnailInterface> = ({
  image,
  isActive,
  onSelect,
}: ThumbnailInterface) => {
  const { isLoading, endLoading } = useLoadable(true);

  return (
    <div
      onClick={onSelect}
      className={classNames(
        "m-1 w-16 md:w-20 aspect-square overflow-hidden rounded-md border border-solid border-neutral-300 transition-colors",
        {
          "ring dark:ring-neutral-200 ring-neutral-800 dark:ring-offset-neutral-200 border-transparent":
            isActive,
        }
      )}
    >
      <div className="relative aspect-square cursor-pointer w-full h-full">
        {isLoading && <ImageLoadingIndicator />}

        <div className="pointer-events-none">
          <SupabaseImage
            src={image.storage_file_path}
            alt={image.name}
            quality={65}
            width={450}
            height={450}
            onLoadingComplete={endLoading}
            loading="lazy"
            className="object-cover absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export const ImageLoadingIndicator = () => (
  <div className="absolute inset-0 bg-neutral-200 dark:bg-gray-800 z-40 flex items-center justify-center gap-1.5">
    <span className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce" />
    <span
      className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce"
      style={{ animationDelay: "250ms" }}
    />
    <span
      className="block relative rounded-full h-1.5 w-1.5 bg-gray-500 animate-bounce"
      style={{ animationDelay: "400ms" }}
    />
  </div>
);
