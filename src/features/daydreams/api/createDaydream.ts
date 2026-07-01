import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DreamFormParams,
  DaydreamAPIDataStructure,
} from "@/features/daydreams/types";
import toast from "react-hot-toast";
import { saveDaydream } from "@/features/daydreams/api/saveDaydream";

export const storeDaydream = (formData: DreamFormParams) =>
  saveDaydream({ formData });

export const useStoreDaydreamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: DreamFormParams
    ): Promise<DaydreamAPIDataStructure> => {
      return await storeDaydream(formData);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["daydream", data.id], data);

      await queryClient.invalidateQueries({
        queryKey: ["daydreams"],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["infinite_daydreams"],
        exact: false,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
