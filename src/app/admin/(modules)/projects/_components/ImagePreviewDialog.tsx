import { Dialog, DialogProps } from "@/components";
import { MdClose } from "react-icons/md";
import { useHotkeys } from "react-hotkeys-hook";
import classNames from "classnames";
import ImagePreviewContainer from "@/components/Image/ImagePreviewContainer";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { useGalleryContext } from "@/context/GalleryContext";

interface ImagePreviewDialogProps
  extends Required<Omit<DialogProps, "children">> {
  indicator?: boolean;
}

const ImagePreviewDialog = ({ isOpen, onClose }: ImagePreviewDialogProps) => {
  const { selectedItem, total, selectedIndex } = useGalleryContext();

  useHotkeys(["esc", "escape"], onClose);

  return (
    <Dialog isOpen={isOpen}>
      <div className="text-neutral-200 text-[15px]">
        {selectedItem?.name ?? ""}
      </div>

      <div className="relative h-full max-w-[1920px] mx-auto">
        <div className="absolute right-1 top-0 z-10">
          <button
            className={classNames("text-white outline-none p-2 cursor-pointer")}
            onClick={onClose}
          >
            <MdClose size={28} />
          </button>
        </div>

        <ImagePreviewContainer>
          <div className="z-10 flex flex-row gap-1.5 absolute bottom-3.5 left-1/2 transform -translate-x-1/2">
            {[...Array(total)].map((_, index) => (
              <span
                className={classNames(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                  [selectedIndex === index ? "bg-white" : "bg-neutral-500"]
                )}
                key={`dot-${selectedItem.name}-${index}`}
              />
            ))}
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
        </ImagePreviewContainer>
      </div>
    </Dialog>
  );
};

export default ImagePreviewDialog;
