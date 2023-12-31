import { BaseSkeletonLoader, Dialog, DialogProps } from "@/components";
import { MdClose } from "react-icons/md";
import { useHotkeys } from "react-hotkeys-hook";
import classNames from "classnames";
import ImagePreviewContainer from "@/components/Image/ImagePreviewContainer";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { useGalleryContext } from "@/context/GalleryContext";
import { useEffect, useRef } from "react";
import { useLoadable } from "@/hooks";

interface ImagePreviewDialogProps
  extends Required<Omit<DialogProps, "children">> {
  indicator?: boolean;
}

const ImagePreviewDialog = ({ isOpen, onClose }: ImagePreviewDialogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedItem, total, selectedIndex } = useGalleryContext();
  const { isLoading, startLoading, endLoading } = useLoadable();

  useHotkeys(["esc", "escape"], onClose);

  const scale = selectedItem?.width / 1024;

  const height = selectedItem?.height / scale;
  const width = selectedItem?.width / scale;

  useEffect(() => {
    startLoading();
  }, [selectedIndex]);

  const onLoadingCompleteHandler = () => {
    containerRef.current?.scrollTo({
      top: 0,
    });

    containerRef.current?.focus();

    endLoading();
  };

  return (
    <Dialog isOpen={isOpen}>
      <div className="text-neutral-200 text-[15px] text-center mb-4">
        {selectedItem?.name ?? ""}
      </div>

      <div className="absolute right-1 top-0 z-10">
        <button
          className={classNames("text-white outline-none p-1.5 cursor-pointer")}
          onClick={onClose}
        >
          <MdClose size={28} />
        </button>
      </div>

      <div className="relative h-full max-w-[1920px] mx-auto">
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
        <ImagePreviewContainer>
          <div className="flex-1 w-full flex justify-center">
            <div
              className={classNames(
                "relative scrollbar-w-2 scrollbar scrollbar-thumb-zinc-400 scrollbar-track-gray-200 rounded-md outline-none",
                {
                  "overflow-y-auto": !isLoading,
                }
              )}
              style={{
                maxHeight: "calc(100vh - 67px)",
                maxWidth: "1024px",
                height,
              }}
              tabIndex={-1}
            >
              {isLoading && (
                <div className="absolute bg-white z-10 overflow-hidden rounded-md">
                  <BaseSkeletonLoader
                    className="rounded-md overflow-hidden"
                    style={{ width, height }}
                  />
                </div>
              )}

              {selectedItem?.storage_file_path && (
                <SupabaseImage
                  src={selectedItem!.storage_file_path}
                  alt={selectedItem?.name ?? ""}
                  className="object-contain group-hover:opacity-90 pointer-events-none"
                  quality={75}
                  width={width}
                  height={height}
                  onLoadingComplete={onLoadingCompleteHandler}
                  onLoad={onLoadingCompleteHandler}
                />
              )}
            </div>
          </div>
        </ImagePreviewContainer>
      </div>
    </Dialog>
  );
};

export default ImagePreviewDialog;
