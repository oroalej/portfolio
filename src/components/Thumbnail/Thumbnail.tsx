"use client";

import {FC} from "react";
import Image from "next/image"
import {ScreenshotInterface, ImageLoadingIndicator} from "@/components";
import {useLoadable} from "@/hooks";
import classNames from "classnames";

export interface ThumbnailInterface {
    image: ScreenshotInterface;
    isActive: boolean;
    onSelect?: () => void
}

export const Thumbnail: FC<ThumbnailInterface> = ({image, isActive, onSelect}: ThumbnailInterface) => {
    const {isLoading, endLoading} = useLoadable(true)

    return (
        <div
            onClick={onSelect}
            className={classNames("m-1.5 w-20 overflow-hidden rounded-md border border-solid border-neutral-300", {
                "ring ring-neutral-800 dark:ring-offset-neutral-800 border-transparent" : isActive
            })}>
            <div className="relative aspect-square cursor-pointer w-full h-full">
                {isLoading && <ImageLoadingIndicator />}

                <div className="pointer-events-none">
                    <Image
                        src={`/images/projects/${image.filename}`}
                        quality={65}
                        layout="fill"
                        objectFit="cover"
                        alt={image.title}
                        onLoadingComplete={endLoading}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>

    )
}
