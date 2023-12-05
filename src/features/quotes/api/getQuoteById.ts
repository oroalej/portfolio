import { useQuery } from "@tanstack/react-query";
import { durationInMinutes } from "@/utils";
import { Tables } from "@/types";
import { supabase } from "@/utils/supabase";

export const getQuoteById = (id: string) => {
  return supabase
    .from("quotes")
    .select("id, category_id, source_id, media_detail_id, content")
    .eq("id", id)
    .throwOnError()
    .single();
};

export const useGetQuote = (id: string) =>
  useQuery({
    enabled: !!id,
    staleTime: durationInMinutes(2),

    queryKey: ["quote", id],
    queryFn: async (): Promise<Omit<Tables<"quotes">, "created_at"> | null> => {
      const { data } = await getQuoteById(id);

      return data as unknown as Omit<Tables<"quotes">, "created_at"> | null;
    },
  });
