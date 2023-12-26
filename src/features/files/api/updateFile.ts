import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";
import { Tables } from "@/types";
import { FileAPIDataStructure } from "@/features/files/types";
import { updatePaginatedDataCache } from "@/utils/pagination";
import { useMoveFileMutation } from "@/features/files/api/moveFile";

interface UpdateFileParams {
  item: FileAPIDataStructure;
  formData: Required<Omit<Tables<"files">, "id" | "created_at">>;
}

interface updateFileParams extends Pick<UpdateFileParams, "formData"> {
  id: string;
}

export const updateFile = ({ id, formData }: updateFileParams) => {
  return supabase
    .from("files")
    .update(formData)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();
};

export const useUpdateFileMutation = () => {
  const queryClient = useQueryClient();
  const moveFileMutation = useMoveFileMutation();

  return useMutation({
    mutationFn: async ({
      item,
      formData,
    }: UpdateFileParams): Promise<FileAPIDataStructure> => {
      if (formData.name !== item.name) {
        await moveFileMutation.mutateAsync({
          bucket_name: item.bucket_name,
          fromPath: item.storage_file_path,
          toPath: formData.storage_file_path,
        });
      }

      const { data } = await updateFile({ id: item.id, formData });

      return data as unknown as FileAPIDataStructure;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<FileAPIDataStructure>(["file", data.id], data);

      updatePaginatedDataCache({
        queryKey: ["files"],
        data,
        queryClient,
      });
    },
    onError: (error, { item }) => {
      toast.error(error.message, {
        id: item.id,
      });
    },
  });
};
