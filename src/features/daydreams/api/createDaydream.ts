import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/types";
import { supabase } from "@/utils/supabase";
import {
  DreamFormParams,
  DaydreamAPIDataStructure,
} from "@/features/daydreams/types";
import toast from "react-hot-toast";

export interface StoreDaydreamParams
  extends Required<Omit<Tables<"daydreams">, "created_at" | "id">> {}

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

export const useStoreDaydreamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: DreamFormParams
    ): Promise<DaydreamAPIDataStructure> => {
      const { data } = await storeDaydream(formData);

      if (data === null) throw new Error("Data not found.");

      return data as unknown as DaydreamAPIDataStructure;
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["daydream", data.id], data);

      await queryClient.invalidateQueries({
        queryKey: ["daydreams"],
        exact: false,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
