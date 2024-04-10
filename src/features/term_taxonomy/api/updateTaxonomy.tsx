import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaxonomyFormData } from "@/features/term_taxonomy/api/createTaxonomy";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { findIndex } from "lodash";

export const updateTaxonomyById = (id: string, formData: TaxonomyFormData) => {
  return supabase
    .from("term_taxonomy")
    .update(formData)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();
};

interface UpdateTaxonomy {
  id: string;
  formData: TaxonomyFormData;
}

export const useUpdateTaxonomyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: UpdateTaxonomy) => {
      const { data, error } = await updateTaxonomyById(id, formData);

      if (error) throw error;

      if (data === null) throw new Error("Data not found.");

      return data;
    },
    onSuccess: (data, { id, formData }, context) => {
      queryClient
        .getQueriesData<TaxonomyAPIDataStructure>({
          queryKey: ["taxonomy", { term_id: formData.term_id }],
          exact: false,
        })
        .forEach(([queryKey]) => {
          queryClient.setQueryData(
            queryKey,
            (prevData: TaxonomyAPIDataStructure[]) => {
              const selectedIndex = findIndex(prevData, { id });

              if (selectedIndex !== -1) {
                const localState = [...prevData];

                localState.splice(selectedIndex, 1, data);

                return localState;
              }

              return;
            }
          );
        });

      queryClient.setQueryData(["taxonomy", { id }], () => data);
    },
  });
};
