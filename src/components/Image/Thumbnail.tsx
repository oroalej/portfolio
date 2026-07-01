"use client";

import classNames from "classnames";
import type { GalleryItem } from "@/context/GalleryContext";
import { useLoadable } from "@/hooks";
import SupabaseImage from "@/components/Image/SupabaseImage";

export interface ThumbnailInterface {
  className?: string;
  image: GalleryItem;
  isActive: boolean;
  onSelect?: () => void;
}

export const Thumbnail = ({
  className,
  image,
  isActive,
  onSelect,
}: ThumbnailInterface) => {
  const { isLoading, endLoading } = useLoadable(true);

  return (
    <button
      type="button"
      aria-label={`Preview ${image.name}`}
      aria-pressed={isActive}
      onClick={onSelect}
      className={classNames(
        "m-1 overflow-hidden rounded-md border border-solid border-neutral-300 transition-all shrink-0 bg-transparent p-0 hover:opacity-100",
        className ?? "h-14 w-14",
        {
          "ring dark:ring-neutral-200 ring-neutral-800 dark:ring-offset-neutral-200 border-transparent":
            isActive,
          "opacity-100": isActive,
          "opacity-60": !isActive,
        }
      )}
    >
      <div className="relative cursor-pointer h-full w-full">
        {isLoading && <ImageLoadingIndicator />}

        <div className="pointer-events-none">
          <SupabaseImage
            src={image.storage_file_path}
            alt={image.name}
            quality={65}
            width={450}
            height={450}
            onLoad={endLoading}
            loading="lazy"
            sizes="(min-width: 768px) 5rem, 4rem"
            className="object-cover absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full"
          />
        </div>
      </div>
    </button>
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
