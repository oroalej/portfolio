"use client";

import classNames from "classnames";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import {
  BaseSkeletonLoader,
  CardBody,
  CardRoot,
  Dialog,
  DialogProps,
} from "@/components";
import { getSafeImageDimensions } from "@/components/Image/getSafeImageDimensions";
import ImagePreviewContainer from "@/components/Image/ImagePreviewContainer";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { Thumbnail } from "@/components/Image/Thumbnail";
import { useGalleryContext } from "@/context/GalleryContext";
import { useElementSize, useLoadable } from "@/hooks";
import { useHotkeys } from "react-hotkeys-hook";

type GalleryPreviewNavigationHandler = () => void | Promise<void>;

interface GalleryPreviewDialogProps
  extends Required<Pick<DialogProps, "isOpen" | "onClose">> {
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  onNext?: GalleryPreviewNavigationHandler;
  onPrevious?: GalleryPreviewNavigationHandler;
  sidebar?: ReactNode;
  stageFooter?: ReactNode;
  thumbnailKeyPrefix: string;
}

export const GalleryPreviewDialog = ({
  isOpen,
  isNextDisabled,
  isPreviousDisabled,
  onClose,
  onNext,
  onPrevious,
  sidebar,
  stageFooter,
  thumbnailKeyPrefix,
}: GalleryPreviewDialogProps) => {
  const { height: containerHeight, ref: containerRef } =
    useElementSize<HTMLDivElement>();
  const { list, selectedItem, selectedIndex, setSelectedIndex } =
    useGalleryContext();
  const { isLoading, startLoading, endLoading } = useLoadable();
  const safeImageDimensions = getSafeImageDimensions(selectedItem ?? undefined);
  const scale = safeImageDimensions.height / (containerHeight || 950);
  const height = safeImageDimensions.height / scale;
  const width = safeImageDimensions.width / scale;

  useHotkeys(["esc", "escape"], onClose);

  useEffect(() => {
    startLoading();
  }, [selectedIndex, selectedItem?.storage_file_path, startLoading]);

  const onClickThumbnailHandler = (index: number) => {
    if (index === selectedIndex) return;

    setSelectedIndex(index);
    startLoading();
  };

  return (
    <Dialog isOpen={isOpen} isOverlayVisible={false}>
      <CardRoot className="h-full sm:rounded-md">
        <button
          type="button"
          aria-label="Close preview"
          className={classNames(
            "dark:text-neutral-200 text-neutral-800 outline-none p-2 cursor-pointer absolute right-1.5 top-1.5 z-10"
          )}
          onClick={onClose}
        >
          <MdClose size={28} />
        </button>

        <CardBody className="flex flex-col lg:flex-row gap-8 h-full max-w-[1920px] mx-auto">
          <div className="flex min-h-0 min-w-0 grow flex-col gap-2 mt-12 lg:mt-0">
            <div className="relative flex min-h-0 grow justify-between items-center overflow-hidden dark:bg-neutral-300 bg-neutral-100 rounded-md md:px-1">
              {isLoading && (
                <div className="absolute inset-0 bg-neutral-100 z-10 inline-flex items-center justify-center md:px-14 lg:px-16">
                  <BaseSkeletonLoader
                    className="max-w-full max-h-full"
                    style={{ height, width }}
                  />
                </div>
              )}

              <ImagePreviewContainer
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
                onNext={onNext}
                onPrevious={onPrevious}
                ref={containerRef}
              >
                {selectedItem?.storage_file_path && (
                  <SupabaseImage
                    src={selectedItem.storage_file_path}
                    alt={selectedItem.name}
                    className={classNames(
                      "object-contain pointer-events-none max-w-full max-h-full w-auto h-auto",
                      {
                        invisible: isLoading,
                      }
                    )}
                    width={width}
                    height={height}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    onLoad={endLoading}
                    sizes="100vw"
                  />
                )}
              </ImagePreviewContainer>
            </div>

            {stageFooter}

            {list.length > 1 && (
              <div className="w-full shrink-0 overflow-x-auto px-2 pb-1">
                <div className="flex flex-row shrink-0 pb-1">
                  {list.map((item, index) => (
                    <Thumbnail
                      key={`${thumbnailKeyPrefix}-${index}-${item.name}`}
                      image={item}
                      isActive={index === selectedIndex}
                      onSelect={() => onClickThumbnailHandler(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {sidebar}
        </CardBody>
      </CardRoot>
    </Dialog>
  );
};
