import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";
import { Buckets, UploadFile } from "@/features/files/types";
import { omit } from "lodash";
import { Tables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface StoreFileBucketParams {
  pathname: string;
  bucket_name: Buckets;
  data: UploadFile;
}

export interface StoreFileParams {
  bucket_name: string;
  storage_file_path: string;
  data: Omit<UploadFile, "file">;
}

export const storeFileBucket = ({
  bucket_name,
  pathname,
  data: { file, ...files },
}: StoreFileBucketParams) => {
  if (file === null) throw new Error("Something went wrong.");

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
    .select("*")
    .single()
    .throwOnError();
};

export const useStoreFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: StoreFileBucketParams
    ): Promise<Tables<"files">> => {
      const fileBucketResult = await storeFileBucket(formData);

      if (fileBucketResult.error) throw fileBucketResult.error;

      if (fileBucketResult.data === null)
        throw new Error("Something went wrong, file not save.");

      const { data, error } = await storeFile({
        bucket_name: formData.bucket_name,
        storage_file_path: fileBucketResult.data.path,
        data: omit(formData.data, ["file"]),
      });

      if (error) throw error;
      if (data === null) throw new Error("Something went wrong");

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["file", data.id], data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
