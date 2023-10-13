import Image from "next/image";
import {BaseSkeletonLoader, ImageSkeletonLoader} from "@/components";
import {Tables} from "@/types";
import {getStoragePublicUrl} from "@/api/ImageAPI";

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
            <div className="relative aspect-square mb-4 group overflow-hidden">
                <div className="absolute inset-0 z-10"/>

                <Image
                    src={getStoragePublicUrl(image_path)}
                    alt={description}
                    width={430}
                    height={430}
                    style={{width: '100%', height: '100%'}}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 point-events-none object-cover"
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
