"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGalleryContext } from "@/context/GalleryContext";
import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";

interface ImagePreviewContainerProps
  extends ComponentPropsWithRef<"div"> {
  isNavigationDisabled?: boolean;
}

const ImagePreviewContainer = ({
  children,
  className,
  isNavigationDisabled = false,
  ref,
  ...remaining
}: ImagePreviewContainerProps) => {
  const { onNext, onPrev, isFirst, isLast } = useGalleryContext();
  const navigationButtonClassName =
    "hidden absolute transform top-1/2 -translate-y-1/2 z-20 text-neutral-800 outline-none p-2.5 aspect-square rounded-full bg-neutral-200 transition-colors";

  return (
    <div className="relative h-full flex justify-center gap-4 w-full">
      <button
        type="button"
        aria-label="Previous image"
        className={classNames(
          navigationButtonClassName,
          "left-2",
          isFirst ? "md:invisible pointer-events-none" : "md:block",
          isNavigationDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-neutral-300"
        )}
        disabled={isFirst || isNavigationDisabled}
        onClick={onPrev}
      >
        <FaChevronLeft size={18} />
      </button>

      <div
        className={classNames(
          "relative flex-1 min-w-0 h-full text-center inline-flex flex-col items-center justify-center gap-3 w-full md:px-14 lg:px-16",
          className
        )}
        ref={ref}
        {...remaining}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Next image"
        className={classNames(
          navigationButtonClassName,
          "right-2",
          isLast ? "md:invisible pointer-events-none" : "md:block",
          isNavigationDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-neutral-300"
        )}
        disabled={isLast || isNavigationDisabled}
        onClick={onNext}
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
};

export default ImagePreviewContainer;
