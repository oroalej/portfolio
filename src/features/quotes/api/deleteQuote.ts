import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "@/utils/supabase";
import { dataWithPagination } from "@/utils/pagination";
import { QuoteAPIDataStructure } from "@/features/quotes/types";

export const deleteQuote = (id: string) => {
  return supabase.from("quotes").delete().eq("id", id).throwOnError();
};

export const useDeleteQuoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      toast.loading("Deleting quote...", { id });

      await deleteQuote(id);
    },
    onMutate: (variables) => {
      toast.loading("Preparing to delete quote...", {
        id: variables,
      });
    },
    onSuccess: (data, variables) => {
      toast.success("Your data has been successfully deleted!", {
        id: variables,
      });

      queryClient.removeQueries({
        queryKey: ["quote", variables],
        exact: true,
        type: "active",
      });

      const cacheQuery = queryClient.getQueryCache().find({
        queryKey: ["quotes"],
        exact: false,
      });

      if (cacheQuery) {
        const { pagination } =
          cacheQuery.state as unknown as dataWithPagination<QuoteAPIDataStructure>;

        if (pagination.last_page !== pagination.current_page) {
          queryClient.removeQueries({
            queryKey: cacheQuery.queryKey,
            exact: true,
            type: "active",
          });
        } else {
          queryClient.setQueryData(
            cacheQuery.queryKey,
            (oldValue: QuoteAPIDataStructure[]) => {
              if (oldValue) {
                return oldValue.filter((item) => item.id !== variables);
              }
            }
          );
        }
      }
    },
    onError: (error, variables) => {
      toast.error(error.message, {
        id: variables,
      });
    },
  });
};
