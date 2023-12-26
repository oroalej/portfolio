"use client";

import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { ImageLoadingIndicator } from "@/components";
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
            width={80}
            height={80}
            onLoadingComplete={endLoading}
            loading="lazy"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
