"use client";

import { omit } from "lodash";
import { DreamFormParams } from "@/features/daydreams/types";
import { Fragment, Suspense, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import { AlertDialog } from "@/components";
import { useOpenable } from "@/hooks";
import {
  useDeleteDaydreamMutation,
  useGetDaydreamById,
  useUpdateDaydreamMutation,
} from "@/features/daydreams/api";

import toast from "react-hot-toast";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";
import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";

const EditDaydreamWrapper = () => {
  const router = useRouter();
  const { daydreamId } = useParams();

  const updateDaydreamMutation = useUpdateDaydreamMutation();
  const deleteDaydreamMutation = useDeleteDaydreamMutation();

  const { data: daydreamData, isLoading: isDataFetching } = useGetDaydreamById(
    daydreamId as string
  );

  const { isOpen, onClose, onOpen } = useOpenable();

  const onSubmitHandler = useCallback(
    async ({ file, ...formData }: DreamFormParams) => {
      if (!daydreamData) return;

      await toast.promise(
        updateDaydreamMutation.mutateAsync({
          formData,
          id: daydreamData.id,
        }),
        {
          success: "Dream successfully updated!",
          loading: "Updating dream...",
          error: (error) => error,
        }
      );
    },
    [daydreamData]
  );

  const onDeleteHandler = useCallback(async () => {
    if (!daydreamId) return;

    await toast.promise(
      deleteDaydreamMutation.mutateAsync(daydreamId as string),
      {
        success: "Your data has been successfully deleted!",
        loading: "Deleting dream...",
        error: (error) => error,
      }
    );

    router.push("/admin/daydreams/create");
  }, []);

  if (isDataFetching || !daydreamData) {
    return (
      <DaydreamFormLoading title="Edit Dream" submitButtonText="Update Dream" />
    );
  }

  return (
    <Fragment>
      <Suspense
        fallback={
          <DaydreamFormLoading
            title="Edit Dream"
            submitButtonText="Update Dream"
          />
        }
      >
        <DaydreamForm
          title="Edit Dream"
          item={{
            ...omit(daydreamData, "file"),
            file_id: daydreamData.file.id,
            file: {
              id: daydreamData.file.id,
              name: daydreamData.file.name,
              bucket_name: daydreamData.file.bucket_name,
              storage_file_path: daydreamData.file.storage_file_path,
            },
          }}
          onSubmit={onSubmitHandler}
          onDelete={onOpen}
          submitButtonText="Update Dream"
        />
      </Suspense>

      <AlertDialog
        onConfirm={onDeleteHandler}
        isOpen={isOpen}
        onClose={onClose}
        confirmButtonText="Yes, delete dream"
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
