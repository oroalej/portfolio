import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaginatedDataCache } from "@/utils/pagination";
import {
  DaydreamAPIDataStructure,
  DreamFormParams,
} from "@/features/daydreams/types";
import toast from "react-hot-toast";
import { saveDaydream } from "@/features/daydreams/api/saveDaydream";

interface UpdateDaydreamParams {
  id: string;
  formData: DreamFormParams;
}

export const updateDaydream = async ({
  id,
  formData,
}: UpdateDaydreamParams): Promise<DaydreamAPIDataStructure> => {
  return await saveDaydream({ formData, id });
};

export const useUpdateDaydreamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: UpdateDaydreamParams
    ): Promise<DaydreamAPIDataStructure> => {
      return await updateDaydream(params);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["daydream", data.id], data);

      updatePaginatedDataCache({
        queryKey: ["daydreams"],
        queryClient,
        data,
      });

      await queryClient.invalidateQueries({
        queryKey: ["infinite_daydreams"],
        exact: false,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables.id });
    },
  });
};
