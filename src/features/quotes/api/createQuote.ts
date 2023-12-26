import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuoteAPIDataStructure } from "@/features/quotes/types";
import { Tables } from "@/types";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

interface StoreQuoteParams
  extends Required<Omit<Tables<"quotes">, "id" | "created_at">> {}

export const createQuote = (formData: StoreQuoteParams) => {
  return supabase
    .from("quotes")
    .insert(formData)
    .select(
      "id, content, created_at, source_id, media_detail_id, category_id, category:category_id(name), source:source_id(name), media_detail:media_detail_id(name)"
    )
    .single()
    .throwOnError();
};

export const useStoreQuoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: StoreQuoteParams
    ): Promise<QuoteAPIDataStructure> => {
      const { data } = await createQuote(formData);

      if (data === null) {
        throw new Error("Data not found.");
      }

      return data as unknown as QuoteAPIDataStructure;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["quotes"],
        exact: false,
        type: "active",
      });

      queryClient.setQueryData(["quote", data.id], data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
