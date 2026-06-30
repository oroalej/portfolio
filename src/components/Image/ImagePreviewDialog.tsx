"use client";

import { BaseSkeletonLoader, Button, Dialog, DialogProps } from "@/components";
import { FileAPIDataStructure } from "@/features/files/types";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { getSafeImageDimensions } from "@/components/Image/getSafeImageDimensions";
import { useElementSize, useLoadable } from "@/hooks";
import classNames from "classnames";

interface ImagePreviewDialogProps extends DialogProps {
  item: Pick<
    FileAPIDataStructure,
    "width" | "height" | "storage_file_path" | "name"
  >;
}

const ImagePreviewDialog = ({
  isOpen,
  onClose,
  children,
  item,
}: ImagePreviewDialogProps) => {
  const {
    element: containerElement,
    height: containerHeight,
    ref: containerRef,
    width: containerWidth,
  } = useElementSize<HTMLDivElement>();
  const { isLoading, startLoading, endLoading } = useLoadable();

  const { height, width } = getSafeImageDimensions(item);
  const availableHeight = containerHeight || 950;
  const availableWidth = containerWidth || 1024;
  const constrainedWidth = availableWidth >= 1024 ? 1024 : availableWidth;

  /**
   * If picture is landscape, get scale value using height.
   * If picture is portrait, get scale value using width. And if the default width is larger than the window width, use clientWidth.
   */
  const scale = width > height ? height / availableHeight : width / constrainedWidth;

  const scaleWidth = width / scale;
  const scaleHeight = height / scale;

  useEffect(() => {
    startLoading();
  }, [item.name, startLoading]);

  const onLoadingCompleteHandler = () => {
    containerElement?.scrollTo({
      top: 0,
    });
    containerElement?.focus();

    setTimeout(() => {
      endLoading();
    }, 300);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="absolute right-4 top-3.5 z-10">
        <Button
          icon
          rounded
          size="extra-small"
          variant="text"
          color="secondary"
          aria-label="Close preview"
          onClick={onClose}
        >
          <MdClose size={22} />
        </Button>
      </div>
      {children ? (
        children
      ) : (
        <div className="relative flex flex-col items-center rounded-md overflow-hidden gap-3.5">
          <p className="text-white text-sm">{item.name}</p>
          <div
            className={classNames(
              "relative scrollbar-w-2 scrollbar scrollbar-thumb-zinc-400 scrollbar-track-gray-200 rounded-md outline-none",
              [isLoading ? "overflow-hidden" : "overflow-y-auto"]
            )}
            ref={containerRef}
            tabIndex={-1}
            style={{
              maxHeight: "calc(100vh - 62px)",
              height: scaleHeight,
              width: scaleWidth,
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-neutral-400 w-full h-full rounded-tl-md rounded-bl-md overflow-hidden z-10">
                <BaseSkeletonLoader className="w-full h-full" />
              </div>
            )}

            <SupabaseImage
              className="w-full"
              src={item.storage_file_path}
              alt={item.name}
              width={scaleWidth}
              height={scaleHeight}
              onLoad={onLoadingCompleteHandler}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ImagePreviewDialog;
