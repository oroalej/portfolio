import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaginatedDataCache } from "@/utils/pagination";
import { StoreDaydreamParams } from "@/features/daydreams/api/createDaydream";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

interface UpdateDaydreamParams {
  id: string;
  formData: StoreDaydreamParams;
}

export const updateDaydream = ({ id, formData }: UpdateDaydreamParams) => {
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: UpdateDaydreamParams
    ): Promise<DaydreamAPIDataStructure> => {
      const { data } = await updateDaydream(params);

      return data as unknown as DaydreamAPIDataStructure;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["daydream", data.id], data);

      updatePaginatedDataCache({
        queryKey: ["daydreams"],
        queryClient,
        data,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.id });
    },
  });
};
