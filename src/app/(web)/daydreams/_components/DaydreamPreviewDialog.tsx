"use client";

import classNames from "classnames";
import { DialogProps, FormGroup, Label } from "@/components";
import { GalleryPreviewDialog } from "@/app/(web)/_components/GalleryPreviewDialog";
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
  const hasCameraSettings =
    iso !== null || shutter_speed !== null || aperture !== null;
  const stageFooter =
    isNextLoading || nextError ? (
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
    ) : null;

  const sidebar = (
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
  );

  return (
    <GalleryPreviewDialog
      isOpen={isOpen}
      isNextDisabled={isNextDisabled}
      isPreviousDisabled={isPreviousDisabled}
      onClose={onClose}
      onNext={onNext}
      onPrevious={onPrevious}
      thumbnailKeyPrefix="daydream-thumbnail"
      stageFooter={stageFooter}
      sidebar={sidebar}
    />
  );
};

export default DaydreamPreviewDialog;
