import {
  useDeleteFileMutation,
  useStoreFileMutation,
} from "@/features/files/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { StoreDaydreamFormData } from "@/features/daydreams/api/createDaydream";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import supabase from "@/utils/supabase";
import { Tables } from "@/types";

interface UpdateDaydreamParams {
  item: DaydreamAPIDataStructure;
  formData: StoreDaydreamFormData;
}

interface UpdateDaydream {
  id: string;
  formData: Required<Omit<Tables<"daydreams">, "created_at" | "id">>;
}

export const updateDaydream = ({ id, formData }: UpdateDaydream) => {
  return supabase
    .from("daydreams")
    .update(formData)
    .eq("id", id)
    .select(
      "id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)"
    )
    .single()
    .throwOnError();
};

export const useUpdateDaydreamMutation = () => {
  const storeFileMutation = useStoreFileMutation();
  const deleteFileMutation = useDeleteFileMutation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      item,
      formData: { image, ...daydreamFormData },
    }: UpdateDaydreamParams): Promise<DaydreamAPIDataStructure> => {
      let fileId = item.file.id;

      try {
        if (image.file) {
          await deleteFileMutation.mutateAsync({
            id: fileId,
            pathname: item.file.storage_file_path,
            bucket_name: "images",
          });

          const fileUploadResult = await storeFileMutation.mutateAsync({
            data: {
              ...image,
              file: image.file![0],
            },
            pathname: "daydreams",
            bucket_name: "images",
          });

          fileId = fileUploadResult.id;
        }

        toast.loading("Saving information to daydreams table...", {
          id: item.id,
        });

        const { data } = await updateDaydream({
          id: item.id,
          formData: { ...daydreamFormData, file_id: fileId },
        });

        return data as unknown as DaydreamAPIDataStructure;
      } catch (error) {
        throw error;
      }
    },
    onMutate: (variables) => {
      toast.loading("Processing your dream...", { id: variables.item.id });
    },
    onSuccess: (data, variables) => {
      toast.success("Your data has been successfully created!", {
        id: variables.item.id,
      });

      queryClient.setQueryData(["daydream", data.id], data);
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.item.id });
    },
  });
};
