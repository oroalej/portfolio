import { Tables } from "@/types";
import { useStoragePublicUrl } from "@/features/files/api";
import { BaseSkeletonLoader, ImageSkeletonLoader } from "@/components";
import Image from "next/image";

export interface DaydreamCardProps
  extends Omit<Tables<"daydreams">, "created_at" | "id" | "file_id"> {
  onSelect: () => void;
  image_path: string;
}

export const DaydreamCard = ({
  image_path,
  year,
  description,
  iso,
  shutter_speed,
  aperture,
  onSelect,
}: DaydreamCardProps) => {
  const { isLoading, data } = useStoragePublicUrl(image_path);

  return (
    <div
      className="bg-white p-5 overflow-hidden cursor-pointer transition-all dark:bg-neutral-100 hover:drop-shadow-lg"
      onClick={onSelect}
    >
      <div className="relative aspect-square mb-4 group overflow-hidden">
        <div className="absolute inset-0 z-10" />

        {isLoading || !data ? (
          <ImageSkeletonLoader />
        ) : (
          <Image
            src={data}
            alt={description}
            width={450}
            height={450}
            quality={75}
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
    </div>
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
