import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export const deleteQuote = (id: string) => {
  return supabase.from("quotes").delete().eq("id", id).throwOnError();
};

export const useDeleteQuoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await deleteQuote(id);
    },
    onSuccess: async (data, variables) => {
      queryClient.removeQueries({
        queryKey: ["quote", variables],
        exact: true,
        type: "active",
      });

      await queryClient.invalidateQueries({
        queryKey: ["quotes"],
        type: "active",
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, {
        id: variables,
      });
    },
  });
};
