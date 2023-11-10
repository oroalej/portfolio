"use client";

import { omit, parseInt } from "lodash";
import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import { CreateDreamFormInterface } from "@/features/daydreams/types";
import { Fragment, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/DaydreamFormLoading";
import { any, number, object, string, ZodType } from "zod";

import { AlertDialog } from "@/components";
import { useOpenable } from "@/hooks";
import {
  useDeleteDaydreamMutation,
  useGetDaydreamById,
  useUpdateDaydreamMutation,
} from "@/features/daydreams/api";
import { useStoragePublicUrl } from "@/features/files/api";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/features/daydreams/data";

export const EditDreamSchema = object({
  shutter_speed: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The shutter speed field is required."
  ),
  aperture: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The aperture field is required."
  ),
  iso: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The iso field is required."
  ),
  year: number(),
  description: string().trim().min(1, "The description field is required."),
  image: object({
    file: (any() as ZodType<FileList>)
      .optional()
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Invalid file type. File type .jpg, .jpeg, .png and .webp files only are accepted."
      )
      .refine(
        (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
        `You're file is too large, max file size is 15MB.`
      ),
    width: number(),
    height: number(),
    name: string().trim(),
    type: string().trim(),
    size: number(),
  }),
});

const EditDaydreamWrapper = () => {
  const router = useRouter();
  const { daydreamId } = useParams();

  const updateDaydreamMutation = useUpdateDaydreamMutation();
  const deleteDaydreamMutation = useDeleteDaydreamMutation();
  const { data: daydreamData, isLoading: isDataFetching } = useGetDaydreamById(
    daydreamId as string
  );

  const fileQuery = useStoragePublicUrl(daydreamData?.file.storage_file_path);

  const { isOpen, onClose, onOpen } = useOpenable();

  const onSubmitHandler = useCallback(
    async (value: CreateDreamFormInterface) => {
      if (!daydreamData) return;

      await updateDaydreamMutation.mutateAsync({
        formData: value,
        item: daydreamData,
      });
    },
    [daydreamData]
  );

  const onDeleteHandler = async () => {
    if (!daydreamData) return;

    await deleteDaydreamMutation.mutateAsync(daydreamData);

    router.push("/admin/daydreams");
  };

  if (isDataFetching || !daydreamData || !fileQuery.data) {
    return (
      <DaydreamFormLoading
        title="Update Daydream"
        cancelButtonText="Reset"
        submitButtonText="Update"
      />
    );
  }

  return (
    <Fragment>
      <DaydreamForm
        item={{
          ...omit(daydreamData, ["id", "file", "created_at"]),
          image: {
            ...omit(daydreamData.file, ["storage_file_path", "id"]),
            file: null,
          },
        }}
        onSubmit={onSubmitHandler}
        onDelete={onOpen}
        defaultImage={fileQuery.data}
        schema={EditDreamSchema}
        title={`Edit Daydream`}
        submitButtonText="Update"
        cancelButtonText="Reset"
      />

      <AlertDialog
        onConfirm={onDeleteHandler}
        isOpen={isOpen}
        onClose={onClose}
        confirmButtonText="Yes, delete"
        confirmButtonColor="danger"
        title="Delete Dream"
        isLoading={deleteDaydreamMutation.isPending}
      >
        Are you sure you want to delete this dream? This action cannot be
        undone.
      </AlertDialog>
    </Fragment>
  );
};

export default EditDaydreamWrapper;
