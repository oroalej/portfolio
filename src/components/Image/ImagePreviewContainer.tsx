"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGalleryContext } from "@/context/GalleryContext";
import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type ImagePreviewNavigationHandler = () => void | Promise<void>;

interface ImagePreviewContainerProps
  extends ComponentPropsWithRef<"div"> {
  isNavigationDisabled?: boolean;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  onNext?: ImagePreviewNavigationHandler;
  onPrevious?: ImagePreviewNavigationHandler;
}

const ImagePreviewContainer = ({
  children,
  className,
  isNextDisabled,
  isNavigationDisabled = false,
  isPreviousDisabled,
  onNext,
  onPrevious,
  ref,
  ...remaining
}: ImagePreviewContainerProps) => {
  const {
    onNext: onContextNext,
    onPrev: onContextPrevious,
    isFirst,
    isLast,
  } = useGalleryContext();
  const navigationButtonClassName =
    "hidden absolute transform top-1/2 -translate-y-1/2 z-20 text-neutral-800 outline-none p-2.5 aspect-square rounded-full bg-neutral-200 transition-colors";
  const isPreviousButtonDisabled = isPreviousDisabled ?? isFirst;
  const isNextButtonDisabled = isNextDisabled ?? isLast;
  const onPreviousHandler = onPrevious ?? onContextPrevious;
  const onNextHandler = onNext ?? onContextNext;
  const isPreviousNavigationDisabled =
    isPreviousButtonDisabled || isNavigationDisabled;
  const isNextNavigationDisabled =
    isNextButtonDisabled || isNavigationDisabled;

  useHotkeys(
    "left",
    () => {
      if (isPreviousNavigationDisabled) return;

      void onPreviousHandler();
    },
    {
      enabled: !isPreviousNavigationDisabled,
      preventDefault: true,
    },
    [isPreviousNavigationDisabled, onPreviousHandler]
  );

  useHotkeys(
    "right",
    () => {
      if (isNextNavigationDisabled) return;

      void onNextHandler();
    },
    {
      enabled: !isNextNavigationDisabled,
      preventDefault: true,
    },
    [isNextNavigationDisabled, onNextHandler]
  );

  return (
    <div className="relative h-full flex justify-center gap-4 w-full">
      <button
        type="button"
        aria-label="Previous image"
        className={classNames(
          navigationButtonClassName,
          "left-2",
          isPreviousButtonDisabled
            ? "md:invisible pointer-events-none"
            : "md:block",
          isNavigationDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-neutral-300"
        )}
        disabled={isPreviousNavigationDisabled}
        onClick={onPreviousHandler}
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
          isNextButtonDisabled
            ? "md:invisible pointer-events-none"
            : "md:block",
          isNavigationDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-neutral-300"
        )}
        disabled={isNextNavigationDisabled}
        onClick={onNextHandler}
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
};

export default ImagePreviewContainer;
