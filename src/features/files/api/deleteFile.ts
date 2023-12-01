import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

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

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      pathname,
      bucket_name,
    }: DeleteFile): Promise<void> => {
      await deleteFileById(id);
      const bucketResult = await deleteFileBucketByPathname(
        bucket_name,
        pathname
      );

      if (bucketResult.error) throw bucketResult.error;
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["files"],
        exact: false,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.id });
    },
  });
};
