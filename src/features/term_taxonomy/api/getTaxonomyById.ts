import { useQuery } from "@tanstack/react-query";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { supabase } from "@/utils/supabase";
import { TAXONOMY_QUERY } from "@/features/term_taxonomy/data";

export const getTaxonomyById = ({ select, id }: GetTaxonomyById) => {
  return supabase
    .from("term_taxonomy")
    .select(select)
    .eq("id", id)
    .single()
    .throwOnError();
};

interface GetTaxonomyById {
  id: string;
  select?: string;
}

export const useGetTaxonomyById = <Type = TaxonomyAPIDataStructure>({
  id,
  select = TAXONOMY_QUERY,
}: GetTaxonomyById) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["taxonomy", { id }],
    queryFn: async (): Promise<Type> => {
      const { data, error } = await getTaxonomyById({ id, select });

      if (error) throw error;
      if (data === null) throw new Error("Data not found.");

      return data as unknown as Type;
    },
  });
};
