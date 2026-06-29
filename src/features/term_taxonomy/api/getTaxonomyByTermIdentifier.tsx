import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";

export const getTaxonomyByTermIdentifier = (identifier: number) => {
  return supabase
    .from("term_taxonomy")
    .select("id, term_id, parent_id, name, description")
    .eq("terms.identifier", identifier)
    .order("name", {
      ascending: true,
    })
    .throwOnError();
};

interface GetTaxonomyByTermIdentifierProps {
  identifier: number;
}

export const useGetTaxonomyByTermIdentifier = ({
  identifier,
}: GetTaxonomyByTermIdentifierProps) => {
  return useQuery({
    enabled: Number.isInteger(identifier),
    staleTime: Infinity,
    queryKey: ["taxonomy", { identifier }],
    queryFn: async (): Promise<TaxonomyAPIDataStructure[]> => {
      const { data } = await getTaxonomyByTermIdentifier(identifier);

      if (data === null) throw new Error("Data not found.");

      return data;
    },
  });
};
