"use client";

import GalleryCategorySelect from "@/app/admin/(modules)/gallery/_components/GalleryCategorySelect";
import classNames from "classnames";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button, Card, FormGroup, Label } from "@/components";
import { FaRegImages } from "react-icons/fa6";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageFileData } from "@/features/files/types";
import {
  ACCEPTED_IMAGE_INPUT_TYPES,
  ACCEPTED_IMAGE_TYPE_LABEL_TEXT,
  getAcceptedImageMimeType,
  MAX_IMAGE_FILE_SIZE,
  MAX_IMAGE_FILE_SIZE_LABEL,
} from "@/features/files/data";
import { PiXBold } from "react-icons/pi";
import {
  DEFAULT_REJECT_FILES_VALUES,
  RejectedFileListDialog,
  RejectedFiles,
} from "@/app/admin/(modules)/gallery/create/_components/RejectedFileListDialog";
import { cloneDeep, isEmpty, omit } from "lodash";
import { useStoreFileMutation } from "@/features/files/api";
import { useQueryClient } from "@tanstack/react-query";
import { any, object } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseGalleryQueryParams } from "@/app/admin/(modules)/gallery/hooks/useGalleryQueryParams";

export interface GalleryFormStructure {
  category_id: string | null;
}

export const DEFAULT_GALLERY_FORM_VALUES = {
  category_id: null,
};

export const StoreGallerySchema = object({
  category_id: any().refine(
    (item) => isNaN(item),
    "The category field is required."
  ),
});

const revokeImagePreviewUrl = (item?: ImageFileData) => {
  if (!item?.blob || typeof URL === "undefined") return;

  URL.revokeObjectURL(item.blob);
};

const revokeImagePreviewUrls = (items: Record<string, ImageFileData>) => {
  Object.values(items).forEach(revokeImagePreviewUrl);
};

const GalleryCreateWrapper = () => {
  const storeFileMutation = useStoreFileMutation();
  const queryClient = useQueryClient();
  const serialized = UseGalleryQueryParams();

  const { handleSubmit, formState, getValues, reset, control } =
    useForm<GalleryFormStructure>({
      mode: "onChange",
      defaultValues: DEFAULT_GALLERY_FORM_VALUES,
      resolver: zodResolver(StoreGallerySchema),
    });

  const [isRejectedDialogOpen, setIsRejectedDialogOpen] = useState(false);
  const [isInsideDropzone, setIsInsideDropzone] = useState(false);

  const [files, setFiles] = useState<Record<string, ImageFileData>>({});
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFiles>(
    DEFAULT_REJECT_FILES_VALUES
  );

  const fileKeys = Object.keys(files);

  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filesRef = useRef<Record<string, ImageFileData>>({});

  const setImageFiles = useCallback((items: Record<string, ImageFileData>) => {
    filesRef.current = items;
    setFiles(items);
  }, []);

  const clearImageFiles = useCallback(() => {
    revokeImagePreviewUrls(filesRef.current);
    setImageFiles({});
  }, [setImageFiles]);

  const onDragEnterHandler = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsInsideDropzone(true);
  }, []);

  const onDragLeaveHandler = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsInsideDropzone(false);
  }, []);

  const onInputFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setImageFileDetails(event.target.files);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const setImageFileDetails = useCallback((data: FileList) => {
    const rejected: RejectedFiles = cloneDeep(DEFAULT_REJECT_FILES_VALUES);
    const accepted: Record<string, ImageFileData> = {};

    Object.keys(data).forEach((key) => {
      const file = data[Number(key)];
      const mimeType = getAcceptedImageMimeType(file);

      if (!mimeType) {
        rejected.type.push(file);

        return;
      }

      if (MAX_IMAGE_FILE_SIZE < file.size) {
        rejected.size.push(file);

        return;
      }

      revokeImagePreviewUrl(accepted[file.name]);

      accepted[file.name] = {
        file: file,
        name: file.name,
        type: mimeType,
        size: file.size,
        height: 0,
        width: 0,
        blob: URL.createObjectURL(file),
        category_id: "",
      };
    });

    if (!isEmpty(accepted)) {
      Object.keys(accepted).forEach((key) => {
        revokeImagePreviewUrl(filesRef.current[key]);
      });

      setImageFiles({
        ...filesRef.current,
        ...accepted,
      });
    }

    if (!!rejected.size.length || !!rejected.type.length) {
      setRejectedFiles(rejected);
      setIsRejectedDialogOpen(true);
    }
  }, [setImageFiles]);

  const onDropHandler = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const files = event.dataTransfer;

      if (files && files.files.length) {
        setImageFileDetails(files.files);
      }

      setIsInsideDropzone(false);
    },
    [setImageFileDetails]
  );

  const getImageDimensions = (event: HTMLImageElement, key: string) => {
    const currentFile = filesRef.current[key];

    if (!currentFile) return;

    setImageFiles({
      ...filesRef.current,
      [key]: {
        ...currentFile,
        width: event.naturalWidth,
        height: event.naturalHeight,
      },
    });
  };

  const onRemoveFileHandler = (key: string) => {
    const { [key]: removedFile, ...nextFiles } = filesRef.current;

    revokeImagePreviewUrl(removedFile);
    setImageFiles(nextFiles);
  };

  const onUploadHandler = async () => {
    const { category_id } = getValues();

    const toasterId = toast.loading(`Uploading ${fileKeys.length} image(s)...`);

    for (const key of fileKeys) {
      await storeFileMutation.mutateAsync({
        pathname: "",
        bucket_name: "images",
        data: {
          ...omit(files[key], "blob"),
          category_id,
        },
      });
    }

    clearImageFiles();
    setRejectedFiles(DEFAULT_REJECT_FILES_VALUES);

    await queryClient.invalidateQueries({
      queryKey: ["files"],
      exact: false,
    });

    await queryClient.invalidateQueries({
      queryKey: ["infinite_files"],
      exact: false,
    });

    toast.success(`Successfully uploaded ${fileKeys.length} image(s).`, {
      id: toasterId,
    });
  };

  useEffect(() => {
    const onDropOverHandler = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const dropZoneElement = dropZoneRef.current;

    dropZoneElement?.addEventListener("drop", onDropHandler);
    dropZoneElement?.addEventListener("dragover", onDropOverHandler);
    dropZoneElement?.addEventListener("dragenter", onDragEnterHandler);
    dropZoneElement?.addEventListener("dragleave", onDragLeaveHandler);

    return () => {
      dropZoneElement?.removeEventListener("drop", onDropHandler);
      dropZoneElement?.removeEventListener("dragover", onDropOverHandler);
      dropZoneElement?.removeEventListener("dragenter", onDragEnterHandler);
      dropZoneElement?.removeEventListener("dragleave", onDragLeaveHandler);
    };
  }, [onDragEnterHandler, onDragLeaveHandler, onDropHandler]);

  useEffect(() => {
    return () => {
      revokeImagePreviewUrls(filesRef.current);
    };
  }, []);

  return (
    <Fragment>
      <Card className="max-w-md w-full shrink-0" rounded>
        <form
          method="post"
          onSubmit={(event: FormEvent) => handleSubmit(onUploadHandler)(event)}
        >
          <fieldset
            className="disabled:opacity-95"
            disabled={formState.isSubmitting}
          >
            <Card.Header className="pb-0">
              <Card.Title icon={<FaRegImages />}>Upload Images</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="mb-1.5">
                <span className="block text-xs text-neutral-500 leading-snug">
                  Max size: <b>{MAX_IMAGE_FILE_SIZE_LABEL}</b>
                </span>

                <span className="block text-xs text-neutral-500 leading-snug">
                  Supported: <b>{ACCEPTED_IMAGE_TYPE_LABEL_TEXT}</b>.
                </span>
              </div>

              <div
                ref={dropZoneRef}
                className={classNames(
                  "h-40 w-full border-2 border-dashed border-neutral-200 inline-flex flex-col justify-center items-center cursor-pointer hover:border-neutral-400 transition-colors rounded-md group bg-neutral-100 mb-3",
                  {
                    "border-neutral-400": isInsideDropzone,
                  }
                )}
                onClick={() => {
                  fileInputRef && fileInputRef.current?.click();
                }}
              >
                <FaRegImages className="text-2xl text-neutral-500 group-hover:text-neutral-500 transition-colors pointer-events-none" />

                <span className="text-sm text-neutral-500 mt-1 font-medium pointer-events-none">
                  Choose photos or drag it here.
                </span>

                <input
                  multiple
                  accept={ACCEPTED_IMAGE_INPUT_TYPES.join(", ")}
                  type="file"
                  className="hidden"
                  tabIndex={-1}
                  ref={fileInputRef}
                  onChange={onInputFileChangeHandler}
                />
              </div>

              {!!fileKeys.length && (
                <Fragment>
                  <h3 className="text-sm text-neutral-800 mb-2 font-medium">
                    {fileKeys.length} Image{fileKeys.length > 1 && "s"}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {fileKeys.map((key) => (
                      <div
                        key={`image-preview-${key}`}
                        className="relative aspect-square overflow-hidden cursor-pointer rounded-md w-full hover:bg-neutral-200 group bg-neutral-100 border border-neutral-100"
                      >
                        <div className="z-10 opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-opacity-25 bg-black ">
                          <button
                            type="button"
                            className="float-right mt-1.5 mr-1.5 text-neutral-800"
                            onClick={() => onRemoveFileHandler(key)}
                          >
                            <PiXBold size={18} />
                          </button>
                        </div>

                        <Image
                          src={files[key].blob ?? ""}
                          alt={files[key].name}
                          className="w-full h-full object-cover group-hover:opacity-90 "
                          quality={65}
                          fill
                          onLoadingComplete={(event) =>
                            getImageDimensions(event, key)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}

              <FormGroup>
                <Label required>Category</Label>

                <Controller
                  name="category_id"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={DEFAULT_GALLERY_FORM_VALUES.category_id}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <GalleryCategorySelect
                      value={value ?? ""}
                      onChange={onChange}
                      defaultValue={DEFAULT_GALLERY_FORM_VALUES.category_id}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </FormGroup>
            </Card.Body>
            <Card.Footer className="pt-0 justify-between">
              <Button
                rounded
                color="secondary"
                variant="text"
                size="small"
                disabled={formState.isSubmitting}
                href={`/admin/gallery${serialized}`}
              >
                Cancel
              </Button>

              <div className="inline-flex gap-3">
                <Button
                  rounded
                  type="button"
                  color="secondary"
                  variant="text"
                  size="small"
                  onClick={() => {
                    clearImageFiles();
                    reset();
                  }}
                  disabled={formState.isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  rounded
                  size="small"
                  type="submit"
                  disabled={!fileKeys.length || !isEmpty(formState.errors)}
                  isLoading={formState.isSubmitting}
                >
                  Upload Image{fileKeys.length > 1 && "s"}
                </Button>
              </div>
            </Card.Footer>
          </fieldset>
        </form>
      </Card>

      {isRejectedDialogOpen && (
        <RejectedFileListDialog
          items={rejectedFiles}
          isOpen={isRejectedDialogOpen}
          onClose={() => {
            setRejectedFiles(DEFAULT_REJECT_FILES_VALUES);
            setIsRejectedDialogOpen(false);
          }}
        />
      )}
    </Fragment>
  );
};

export default GalleryCreateWrapper;
