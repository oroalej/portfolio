import { useQuery } from "@tanstack/react-query";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { supabase } from "@/utils/supabase";

export const getTaxonomyById = (id: string) => {
  return supabase
    .from("term_taxonomy")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();
};

export const useGetTaxonomyById = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["taxonomy", { id }],
    queryFn: async (): Promise<TaxonomyAPIDataStructure> => {
      const { data } = await getTaxonomyById(id);

      if (data === null) throw new Error("Data not found.");

      return data;
    },
  });
};
