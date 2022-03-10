import {FC} from "react";
import Image from "next/image"
import {ImageLoadingIndicator, ScreenshotInterface} from "@/components/index";
import {useLoadable} from "@/hooks/index";

export interface ThumbnailInterface {
  image: ScreenshotInterface
}

export const Thumbnail: FC<ThumbnailInterface> = (props: ThumbnailInterface) => {
  const {image} = props;
  const {isLoading, endLoading} = useLoadable(true)

  return (
    <div className={`relative aspect-square cursor-pointer w-full h-full`}>
      {isLoading && <ImageLoadingIndicator />}

      <Image src={`/images/projects/${image.filename}`}
             quality={65}
             layout="fill"
             objectFit="cover"
             alt={image.title}
             onLoadingComplete={endLoading}/>
    </div>
  )
}
