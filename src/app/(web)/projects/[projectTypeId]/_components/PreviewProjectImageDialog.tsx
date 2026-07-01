"use client";

import { DialogProps, FormGroup, Label } from "@/components";
import { GalleryPreviewDialog } from "@/app/(web)/_components/GalleryPreviewDialog";
import type { ProjectCardItem } from "@/features/projects/types";
import { ProjectLinks } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectLinks";

interface PreviewProjectImageDialogProps
  extends Required<Pick<DialogProps, "isOpen" | "onClose">>,
    Pick<
      ProjectCardItem,
      "title" | "repository_link" | "design_link" | "website_link"
    > {}

const PreviewProjectImageDialog = ({
  isOpen,
  onClose,
  title,
  website_link,
  design_link,
  repository_link,
}: PreviewProjectImageDialogProps) => {
  return (
    <GalleryPreviewDialog
      isOpen={isOpen}
      onClose={onClose}
      thumbnailKeyPrefix="project-thumbnail"
      sidebar={
        <div className="flex flex-col w-full lg:w-80 shrink-0 gap-4">
          <div className="grow text-right lg:grow-0 lg:text-left">
            <h3 className="hidden lg:block text-lg font-bold capitalize text-neutral-600 dark:text-white mb-2">
              Details:
            </h3>

            <FormGroup>
              <Label className="!mb-0">Project</Label>
              <p className="text-neutral-700 dark:text-white text-sm lg:text-lg font-bold">
                {title}
              </p>
            </FormGroup>
          </div>

          <ProjectLinks
            className="flex flex-row gap-4 justify-end lg:justify-start"
            design_link={design_link}
            repository_link={repository_link}
            website_link={website_link}
          />
        </div>
      }
    />
  );
};

export default PreviewProjectImageDialog;
