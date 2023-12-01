import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGalleryContext } from "@/context/GalleryContext";
import SupabaseImage from "@/app/admin/daydreams/_components/SupabaseImage";
import classNames from "classnames";

const ImagePreviewContainer = () => {
  const { onNext, onPrev, isFirst, isLast, selectedItem } = useGalleryContext();

  return (
    <div className="relative h-full flex justify-between items-center gap-12 px-2">
      <button
        className={classNames(
          "text-neutral-800 outline-none p-2 aspect-square rounded-full cursor-pointer bg-neutral-200 hover:bg-neutral-300 transition-colors",
          { "invisible pointer-events-none": isFirst }
        )}
        disabled={isFirst}
        onClick={onPrev}
      >
        <FaChevronLeft size={16} />
      </button>

      <div className="flex-1 h-full text-center inline-flex flex-col justify-center gap-3">
        <div className="text-neutral-200 text-[15px]">
          {selectedItem?.name ?? ""}
        </div>

        <div className="relative flex-1 pointer-events-none">
          {selectedItem?.storage_file_path && (
            <SupabaseImage
              src={selectedItem!.storage_file_path}
              alt={selectedItem?.name ?? ""}
              className="!top-1/2 !left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain group-hover:opacity-90 pointer-events-none !w-auto !h-auto max-w-full max-h-full"
              quality={75}
              fill
            />
          )}
        </div>
      </div>

      <button
        className={classNames(
          "text-neutral-800 outline-none p-2 aspect-square rounded-full cursor-pointer bg-neutral-200 hover:bg-neutral-300 transition-colors",
          { "invisible pointer-events-none": isLast }
        )}
        disabled={isLast}
        onClick={onNext}
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default ImagePreviewContainer;
