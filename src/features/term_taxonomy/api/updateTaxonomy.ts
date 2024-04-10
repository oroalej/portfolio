import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaxonomyFormData } from "@/features/term_taxonomy/api/createTaxonomy";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { findIndex } from "lodash";
import {
  TAXONOMY_QUERY,
  TAXONOMY_WITH_PARENT_QUERY,
} from "@/features/term_taxonomy/data";

export const updateTaxonomyById = ({
  id,
  formData,
  select,
}: UpdateTaxonomy) => {
  return supabase
    .from("term_taxonomy")
    .update(formData)
    .eq("id", id)
    .select(select)
    .single()
    .throwOnError();
};

interface UpdateTaxonomy {
  id: string;
  formData: TaxonomyFormData;
  select?: string;
}

export const useUpdateTaxonomyMutation = <
  Type = TaxonomyAPIDataStructure
>() => {
  const queryClient = useQueryClient();

  return useMutation<Type, Error, UpdateTaxonomy>({
    mutationFn: async ({
      id,
      formData,
      select = TAXONOMY_QUERY,
    }: UpdateTaxonomy) => {
      const { data, error } = await updateTaxonomyById({
        id,
        formData,
        select,
      });

      if (error) throw error;

      if (data === null) throw new Error("Data not found.");

      return data as unknown as Type;
    },
    onSuccess: (data, { id, formData }, context) => {
      queryClient
        .getQueriesData<TaxonomyAPIDataStructure>({
          queryKey: ["taxonomy", { term_id: formData.term_id }],
          exact: false,
        })
        .forEach(([queryKey]) => {
          queryClient.setQueryData(queryKey, (prevData: Type[]) => {
            const selectedIndex = findIndex(prevData, { id } as any);

            if (selectedIndex !== -1) {
              const localState = [...prevData];

              localState.splice(selectedIndex, 1, data as unknown as Type);

              return localState;
            }

            return;
          });
        });

      queryClient.setQueryData(["taxonomy", { id }], () => data);
    },
  });
};
