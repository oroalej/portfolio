import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGalleryContext } from "@/context/GalleryContext";
import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

const ImagePreviewContainer = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ children }, ref) => {
  const { onNext, onPrev, isFirst, isLast } = useGalleryContext();

  return (
    <div className="relative h-full flex justify-center gap-4 w-full">
      <button
        className={classNames(
          "hidden absolute left-2 transform top-1/2 -translate-y-1/2 z-10 text-neutral-800 outline-none p-2.5 aspect-square rounded-full cursor-pointer bg-neutral-200 hover:bg-neutral-300 transition-colors",
          [isFirst ? "md:invisible pointer-events-none" : "md:block"]
        )}
        disabled={isFirst}
        onClick={onPrev}
      >
        <FaChevronLeft size={18} />
      </button>

      <div
        className="relative flex-1 h-full text-center inline-flex flex-col items-center justify-center gap-3 w-full"
        ref={ref}
      >
        {children}
      </div>

      <button
        className={classNames(
          "hidden absolute right-2 transform top-1/2 -translate-y-1/2 text-neutral-800 outline-none p-2.5 aspect-square rounded-full cursor-pointer bg-neutral-200 hover:bg-neutral-300 transition-colors",
          [isLast ? "md:invisible pointer-events-none" : "md:block"]
        )}
        disabled={isLast}
        onClick={onNext}
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
});

ImagePreviewContainer.displayName = "ImagePreviewContainer";

export default ImagePreviewContainer;
