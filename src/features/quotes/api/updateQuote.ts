import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "@/utils/supabase";
import { Tables } from "@/types";
import { QuoteAPIDataStructure } from "@/features/quotes/types";
import { dataWithPagination } from "@/utils/pagination";

interface UpdateQuoteParams {
  id: string;
  formData: Required<Omit<Tables<"quotes">, "id" | "created_at">>;
}

const updateQuote = ({ id, formData }: UpdateQuoteParams) => {
  return supabase
    .from("quotes")
    .update(formData)
    .eq("id", id)
    .throwOnError()
    .select("id, category_id, source_id, media_detail_id, content")
    .throwOnError()
    .single();
};

export const useUpdateQuoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: UpdateQuoteParams): Promise<QuoteAPIDataStructure> => {
      toast.loading("Updating quote", { id });

      const { data } = await updateQuote({ id, formData });

      return data as unknown as QuoteAPIDataStructure;
    },
    onMutate: async (variables) => {
      toast.loading("Preparing update...", {
        id: variables.id,
      });

      await queryClient.cancelQueries({
        queryKey: ["quote", variables.id],
      });
    },
    onSuccess: (data, variables) => {
      toast.success("Your data has been successfully updated!", {
        id: variables.id,
      });

      queryClient.setQueryData<QuoteAPIDataStructure>(["quote", data.id], data);

      const cacheQuery = queryClient.getQueryCache().find({
        queryKey: ["quotes"],
        exact: false,
      });

      if (cacheQuery) {
        queryClient.setQueryData(
          cacheQuery.queryKey,
          (oldValue: QuoteAPIDataStructure[]) => {
            if (oldValue) {
              return oldValue.map((item) => {
                if (item.id === data.id) {
                  return data;
                }

                return item;
              });
            }
          }
        );
      }
    },
    onError: (error, variables) => {
      toast.error(error.message, {
        id: variables.id,
      });
    },
  });
};
