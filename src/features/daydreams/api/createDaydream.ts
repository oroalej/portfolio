import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Tables } from "@/types";
import supabase from "@/utils/supabase";
import { useStoreFileMutation } from "@/features/files/api";
import { ImageFileData } from "@/features/files/types";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";

export interface StoreDaydreamParams
  extends Required<Omit<Tables<"daydreams">, "created_at" | "id">> {}

export interface StoreDaydreamFormData
  extends Required<Omit<Tables<"daydreams">, "created_at" | "id" | "file_id">> {
  image: ImageFileData;
}

export const storeDaydream = (formData: StoreDaydreamParams) => {
  return supabase
    .from("daydreams")
    .insert(formData)
    .select(
      "id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)"
    )
    .single()
    .throwOnError();
};

const id = crypto.randomUUID();

export const useStoreDaydreamMutation = () => {
  const storeFileMutation = useStoreFileMutation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      image,
      ...formData
    }: StoreDaydreamFormData): Promise<DaydreamAPIDataStructure> => {
      toast.loading("Saving image to storage...", { id });

      const fileResult = await storeFileMutation.mutateAsync({
        pathname: "daydreams",
        bucket_name: "images",
        data: {
          ...image,
          file: image.file![0],
        },
      });

      toast.loading("Saving information to daydreams table...", { id });

      const { data } = await storeDaydream({
        ...formData,
        file_id: fileResult.id,
      });

      if (data === null) throw new Error("Data not found.");

      return data as unknown as DaydreamAPIDataStructure;
    },
    onMutate: () => {
      toast.loading("Processing your dream...", { id });
    },
    onSuccess: (data) => {
      toast.success("Your data has been successfully created!", { id });

      queryClient.setQueryData(["daydream", data.id], data);
    },
    onError: (error) => {
      toast.error(error.message, { id });
    },
  });
};
