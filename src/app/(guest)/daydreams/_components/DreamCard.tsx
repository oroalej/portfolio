import Image from "next/image";
import {DreamCardProps} from "@/app/(guest)/daydreams/_types";

const DreamCard = (props: DreamCardProps) => {
    const {image_path, year, description, iso, shutter_speed, aperture} = props;

    return (
        <div
            className="bg-white p-4 overflow-hidden cursor-pointer transition-all"
        >
            <div className="relative aspect-square mb-4 group">
                <div className="absolute inset-0 z-10"/>

                <Image
                    src={image_path}
                    alt={description}
                    fill
                    className="object-cover object-center point-events-none"
                />
            </div>

            <div className="flex flex-row justify-between text-neutral-600 text-sm gap-6">
                <div>
                    <span className="block">{iso} <abbr
                        title="International Organization for Standardization">ISO</abbr></span>
                    <span className="block">{shutter_speed} <abbr title="Shutter Speed">SS</abbr></span>
                    <span className="block">{aperture} <abbr title="Aperture">A</abbr></span>
                </div>
                <div className="grow text-right">
                    <span className="block">{description}</span>
                    <span className="block">{year}</span>
                </div>
            </div>
        </div>
    )
}

export default DreamCard;
