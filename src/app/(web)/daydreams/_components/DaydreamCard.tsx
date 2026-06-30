"use client";

import { Tables } from "@/types";
import { useStoragePublicUrl } from "@/features/files/api";
import { BaseSkeletonLoader, ImageSkeletonLoader } from "@/components";
import Image from "next/image";

export interface DaydreamCardProps
  extends Omit<Tables<"daydreams">, "created_at" | "id"> {
  onSelect: () => void;
  image_count: number;
  image_path?: string;
}

export const DaydreamCard = ({
  image_path,
  year,
  description,
  iso,
  shutter_speed,
  aperture,
  onSelect,
  image_count,
}: DaydreamCardProps) => {
  const { isLoading, data } = useStoragePublicUrl(image_path);

  return (
    <button
      type="button"
      aria-label={`Preview ${description}`}
      className="block w-full bg-white p-5 overflow-hidden cursor-pointer transition-all dark:bg-neutral-100 hover:drop-shadow-lg text-left"
      onClick={onSelect}
    >
      <div className="relative aspect-square mb-4 group overflow-hidden">
        <div className="absolute inset-0 z-10" />
        {image_count > 1 && (
          <span className="absolute right-2 top-2 z-20 rounded-md bg-neutral-900/80 px-2 py-1 text-xs font-medium text-white">
            {image_count} images
          </span>
        )}

        {isLoading || !data ? (
          <ImageSkeletonLoader />
        ) : (
          <Image
            src={data}
            alt={description}
            width={450}
            height={450}
            quality={75}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            style={{ width: "100%", height: "100%" }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 point-events-none object-cover"
          />
        )}
      </div>

      <div className="flex flex-row justify-between text-neutral-600 text-sm gap-6">
        <div className="flex flex-col grow gap-0.5">
          <span className="whitespace-nowrap">
            {iso}{" "}
            <abbr title="International Organization for Standardization">
              ISO
            </abbr>
          </span>
          <span className="whitespace-nowrap">
            {shutter_speed} <abbr title="Shutter Speed">SS</abbr>
          </span>
          <span className="whitespace-nowrap">
            {aperture} <abbr title="Aperture">A</abbr>
          </span>
        </div>
        <div className="flex flex-col gap-0.5 items-end text-right">
          <span>{description}</span>
          <span className="whitespace-nowrap">{year}</span>
        </div>
      </div>
    </button>
  );
};

export const DaydreamCardLoading = () => (
  <div className="bg-white p-4 overflow-hidden cursor-pointer transition-all">
    <div className="relative aspect-square mb-4 group">
      <ImageSkeletonLoader />
    </div>

    <div className="flex flex-row justify-between text-neutral-600 text-sm gap-6">
      <div className="flex flex-col grow gap-0.5">
        <BaseSkeletonLoader className="h-5 w-24" />
        <BaseSkeletonLoader className="h-5 w-24" />
        <BaseSkeletonLoader className="h-5 w-24" />
      </div>

      <div className="flex flex-col grow gap-0.5 items-end">
        <BaseSkeletonLoader className="h-5 w-24" />
        <BaseSkeletonLoader className="h-5 w-24" />
      </div>
    </div>
  </div>
);
