import toast from "react-hot-toast";
import supabase from "@/utils/supabase";
import { Tables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QuoteAPIDataStructure } from "@/features/quotes/types";

interface StoreQuoteParams
  extends Required<Omit<Tables<"quotes">, "id" | "created_at">> {}

export const createQuote = (formData: StoreQuoteParams) => {
  return supabase
    .from("quotes")
    .insert(formData)
    .select("id, category_id, source_id, media_detail_id, content")
    .single()
    .throwOnError();
};

const id = crypto.randomUUID();

export const useStoreQuoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: StoreQuoteParams
    ): Promise<QuoteAPIDataStructure> => {
      toast.loading("Creating your quote...", { id });

      const { data } = await createQuote(formData);

      if (data === null) {
        throw new Error("Data not found.");
      }

      return data as unknown as QuoteAPIDataStructure;
    },
    onSuccess: (data) => {
      toast.success("Your data has been successfully created!", { id });

      queryClient.setQueryData(["quote", data.id], data);
      queryClient.removeQueries({
        queryKey: ["quotes"],
        exact: false,
        type: "active",
      });
    },
    onError: (error) => {
      toast.error(error.message, { id });
    },
  });
};
