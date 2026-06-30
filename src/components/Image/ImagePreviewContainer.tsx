import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGalleryContext } from "@/context/GalleryContext";
import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

interface ImagePreviewContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isNavigationDisabled?: boolean;
}

const ImagePreviewContainer = forwardRef<
  HTMLDivElement,
  ImagePreviewContainerProps
>(({ children, isNavigationDisabled = false }, ref) => {
  const { onNext, onPrev, isFirst, isLast } = useGalleryContext();
  const navigationButtonClassName =
    "hidden absolute transform top-1/2 -translate-y-1/2 z-20 text-neutral-800 outline-none p-2.5 aspect-square rounded-full bg-neutral-200 transition-colors";

  return (
    <div className="relative h-full flex justify-center gap-4 w-full">
      <button
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
        className="relative flex-1 min-w-0 h-full text-center inline-flex flex-col items-center justify-center gap-3 w-full md:px-14 lg:px-16"
        ref={ref}
      >
        {children}
      </div>

      <button
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
});

ImagePreviewContainer.displayName = "ImagePreviewContainer";

export default ImagePreviewContainer;
