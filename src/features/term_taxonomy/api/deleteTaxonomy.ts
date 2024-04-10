import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";

export const deleteTaxonomyById = (id: string) => {
  return supabase.from("term_taxonomy").delete().eq("id", id).throwOnError();
};

interface DeleteTaxonomy {
  id: string;
  term_id?: string;
}

export const useDeleteTaxonomyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteTaxonomy): Promise<void> => {
      await deleteTaxonomyById(id);
    },
    onSuccess: (_, { id, term_id }) => {
      if (!term_id) return;

      queryClient
        .getQueriesData<TaxonomyAPIDataStructure[]>({
          queryKey: [
            "taxonomy",
            {
              term_id: term_id,
            },
          ],
          exact: false,
        })
        .forEach(([queryKey]) => {
          queryClient.setQueryData(
            queryKey,
            (prevData: TaxonomyAPIDataStructure[]) => {
              return [...(prevData || []).filter((item) => item.id !== id)];
            }
          );
        });
    },
  });
};
