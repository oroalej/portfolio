import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaginatedDataCache } from "@/utils/pagination";
import { supabase } from "@/utils/supabase";
import { Tables } from "@/types";
import { QuoteAPIDataStructure } from "@/features/quotes/types";
import toast from "react-hot-toast";

interface UpdateQuoteParams {
  id: string;
  formData: Required<Omit<Tables<"quotes">, "id" | "created_at">>;
}

const updateQuote = ({ id, formData }: UpdateQuoteParams) => {
  return supabase
    .from("quotes")
    .update({
      category_id: formData.category_id,
      source_id: formData.source_id,
      media_detail_id: formData.media_detail_id,
      content: formData.content,
    })
    .eq("id", id)
    .throwOnError()
    .select(
      "id, content, created_at, source_id, category_id, media_detail_id, category:category_id(id, name), source:source_id(name), media_detail:media_detail_id(name)"
    )
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
      const { data } = await updateQuote({ id, formData });

      return data as unknown as QuoteAPIDataStructure;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<QuoteAPIDataStructure>(["quote", data.id], data);

      updatePaginatedDataCache({
        queryKey: ["quotes"],
        data,
        queryClient,
      });
    },
    onError: (error, variables) => {
      toast.error(error.message, {
        id: variables.id,
      });
    },
  });
};
