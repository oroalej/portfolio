import toast from "react-hot-toast";
import supabase from "@/utils/supabase";
import { Buckets, UploadData } from "@/features/files/types";
import { omit, snakeCase } from "lodash";
import { Tables } from "@/types";
import { useMutation } from "@tanstack/react-query";

export interface StoreFileBucketParams {
  pathname: string;
  bucket_name: Buckets;
  data: UploadData<File>;
}

export interface StoreFileParams {
  bucket_name: string;
  storage_file_path: string;
  data: Omit<UploadData<File>, "file">;
}

export const storeFileBucket = ({
  bucket_name,
  pathname,
  data: { file, ...files },
}: StoreFileBucketParams) => {
  return supabase.storage
    .from(bucket_name)
    .upload(`${pathname}/${files.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
};

export const storeFile = ({
  bucket_name,
  storage_file_path,
  data,
}: StoreFileParams) => {
  return supabase
    .from("files")
    .insert({
      ...data,
      bucket_name,
      storage_file_path,
    })
    .select()
    .single()
    .throwOnError();
};

const toasterId = crypto.randomUUID();

export const useStoreFileMutation = () =>
  useMutation({
    mutationFn: async (
      formData: StoreFileBucketParams
    ): Promise<Tables<"files">> => {
      toast.loading(`Uploading file...`, { id: toasterId });

      const fileBucketResult = await storeFileBucket(formData);

      if (fileBucketResult.error) throw fileBucketResult.error;

      if (fileBucketResult.data === null)
        throw new Error("Something went wrong, file not save.");

      toast.loading(`Saving file information to table...`, { id: toasterId });

      const { data } = await storeFile({
        bucket_name: formData.bucket_name,
        storage_file_path: fileBucketResult.data.path,
        data: omit(formData.data, ["file"]),
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Your file has been successfully uploaded!", {
        id: toasterId,
      });
    },
    onError: (error) => {
      toast.error(error.message, { id: toasterId });
    },
  });
