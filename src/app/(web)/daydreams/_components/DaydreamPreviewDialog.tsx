"use client";

import classNames from "classnames";
import { getSafeImageDimensions } from "@/components/Image/getSafeImageDimensions";
import ImagePreviewContainer from "@/components/Image/ImagePreviewContainer";
import SupabaseImage from "@/components/Image/SupabaseImage";
import { Thumbnail } from "@/components/Image/Thumbnail";
import { MdClose } from "react-icons/md";
import {
  BaseSkeletonLoader,
  CardBody,
  CardRoot,
  Dialog,
  DialogProps,
  FormGroup,
  Label,
} from "@/components";
import { useGalleryContext } from "@/context/GalleryContext";
import { useHotkeys } from "react-hotkeys-hook";
import { useElementSize, useLoadable } from "@/hooks";
import { useEffect } from "react";
import { Tables } from "@/types";

type DaydreamPreviewNavigationHandler = () => void | Promise<void>;

interface DaydreamPreviewDialogProps
  extends Required<Pick<DialogProps, "isOpen" | "onClose">>,
    Omit<Tables<"daydreams">, "created_at" | "id"> {
  isNextDisabled: boolean;
  isNextLoading: boolean;
  isPreviousDisabled: boolean;
  nextError: string | null;
  onNext: DaydreamPreviewNavigationHandler;
  onPrevious: DaydreamPreviewNavigationHandler;
}

const DaydreamPreviewDialog = ({
  isOpen,
  isNextDisabled,
  isNextLoading,
  isPreviousDisabled,
  nextError,
  onClose,
  onNext,
  onPrevious,
  year,
  iso,
  shutter_speed,
  description,
  aperture,
}: DaydreamPreviewDialogProps) => {
  const { height: containerHeight, ref: containerRef } =
    useElementSize<HTMLDivElement>();
  const { list, selectedItem, selectedIndex, setSelectedIndex } =
    useGalleryContext();
  const { isLoading, startLoading, endLoading } = useLoadable();
  const hasCameraSettings =
    iso !== null || shutter_speed !== null || aperture !== null;
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

            {(isNextLoading || nextError) && (
              <p
                role={nextError ? "alert" : "status"}
                className={classNames(
                  "px-2 text-xs text-neutral-600 dark:text-neutral-200",
                  {
                    "text-red-700 dark:text-red-300": nextError,
                  }
                )}
              >
                {isNextLoading ? "Loading next daydream..." : nextError}
              </p>
            )}

            {list.length > 1 && (
              <div className="w-full shrink-0 overflow-x-auto px-2 pb-1">
                <div className="flex flex-row shrink-0 pb-1">
                  {list.map((item, index) => (
                    <Thumbnail
                      key={`daydream-thumbnail-${index}-${item.name}`}
                      image={item}
                      isActive={index === selectedIndex}
                      onSelect={() => onClickThumbnailHandler(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-row-reverse lg:flex-col w-full lg:w-80 shrink-0">
            <div className="grow text-right lg:grow-0 lg:text-left">
              <h3 className="hidden lg:block text-lg font-bold capitalize text-neutral-600 dark:text-white mb-2">
                Details:
              </h3>

              <FormGroup>
                <Label className="!mb-0">Year</Label>
                <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">
                  {year}
                </p>
              </FormGroup>

              <FormGroup>
                <Label className="!mb-0">Description</Label>
                <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">
                  {description}
                </p>
              </FormGroup>
            </div>

            {hasCameraSettings && (
              <div className="grow">
                <h3 className="hidden lg:block text-lg font-bold capitalize text-neutral-600 dark:text-white mb-2">
                  Camera Setting:
                </h3>

                {iso !== null && (
                  <FormGroup>
                    <Label className="!mb-0">
                      <abbr title="International Organization for Standardization">
                        ISO
                      </abbr>
                    </Label>
                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">
                      {iso}
                    </p>
                  </FormGroup>
                )}

                {shutter_speed !== null && (
                  <FormGroup>
                    <Label className="!mb-0">
                      <span className="hidden xs:block">Shutter Speed</span>
                      <span className="xs:hidden">
                        <abbr title="Shutter Speed">SS</abbr>
                      </span>
                    </Label>
                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">
                      {shutter_speed}
                    </p>
                  </FormGroup>
                )}

                {aperture !== null && (
                  <FormGroup>
                    <Label className="!mb-0">Aperture</Label>
                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">
                      {aperture}
                    </p>
                  </FormGroup>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </CardRoot>
    </Dialog>
  );
};

export default DaydreamPreviewDialog;
