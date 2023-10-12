import Image from "next/image";
import {BaseSkeletonLoader, ImageSkeletonLoader} from "@/components";
import {Tables} from "@/types";

export interface DaydreamCardProps extends Omit<Tables<'daydreams'>, "created_at" | "id" | "file_id"> {
    onSelect: () => void;
    image_path: string
}

export const DaydreamCard = (props: DaydreamCardProps) => {
    const {image_path, year, description, iso, shutter_speed, aperture, onSelect} = props;

    return (
        <div
            className="bg-white p-4 overflow-hidden cursor-pointer transition-all"
            onClick={onSelect}
        >
            <div className="relative aspect-square mb-4 group">
                <div className="absolute inset-0 z-10"/>

                <Image
                    src={image_path}
                    alt={description}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center point-events-none"
                    quality={75}
                />
            </div>

            <div className="flex flex-row justify-between text-neutral-600 text-sm gap-6">
                <div className="flex flex-col grow gap-0.5">
                    <span>{iso} <abbr
                        title="International Organization for Standardization">ISO</abbr></span>
                    <span>{shutter_speed} <abbr title="Shutter Speed">SS</abbr></span>
                    <span>{aperture} <abbr title="Aperture">A</abbr></span>
                </div>
                <div className="flex flex-col grow gap-0.5 items-end">
                    <span>{description}</span>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    )
}

export const DaydreamCardLoading = () => (
    <div className="bg-white p-4 overflow-hidden cursor-pointer transition-all">
        <div className="relative aspect-square mb-4 group">
            <ImageSkeletonLoader/>
        </div>

        <div className="flex flex-row justify-between text-neutral-600 text-sm gap-6">
            <div className="flex flex-col grow gap-0.5">
                <BaseSkeletonLoader className="h-5 w-24"/>
                <BaseSkeletonLoader className="h-5 w-24"/>
                <BaseSkeletonLoader className="h-5 w-24"/>
            </div>

            <div className="flex flex-col grow gap-0.5 items-end">
                <BaseSkeletonLoader className="h-5 w-24"/>
                <BaseSkeletonLoader className="h-5 w-24"/>
            </div>
        </div>
    </div>
)
