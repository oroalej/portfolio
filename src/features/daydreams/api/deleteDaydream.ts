import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export const deleteDaydream = (id: string) => {
  return supabase.from("daydreams").delete().eq("id", id).throwOnError();
};

export const useDeleteDaydreamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await deleteDaydream(id);
    },
    onSuccess: async (data, variables) => {
      queryClient.removeQueries({
        queryKey: ["daydream", variables],
        exact: true,
        type: "active",
      });

      await queryClient.invalidateQueries({
        queryKey: ["daydreams"],
        exact: false,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, { id: variables });
    },
  });
};
