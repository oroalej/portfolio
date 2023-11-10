import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import supabase from "@/utils/supabase";

export const deleteFileById = (id: string) => {
  return supabase.from("files").delete().eq("id", id).throwOnError();
};

export const deleteFileBucketByPathname = (
  bucket_name: string,
  pathname: string
) => {
  return supabase.storage.from(bucket_name).remove([pathname]);
};

export interface DeleteFile {
  id: string;
  pathname: string;
  bucket_name: string;
}

export const useDeleteFileMutation = () =>
  useMutation({
    mutationFn: async ({
      id,
      pathname,
      bucket_name,
    }: DeleteFile): Promise<void> => {
      toast.loading(`Deleting file...`, { id });

      await deleteFileById(id);
      const bucketResult = await deleteFileBucketByPathname(
        bucket_name,
        pathname
      );

      if (bucketResult.error) throw bucketResult.error;
    },
    onSuccess: (data, variables) => {
      toast.success("Your file has been successfully deleted!", {
        id: variables.id,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.id });
    },
  });
