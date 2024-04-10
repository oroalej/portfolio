import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sortBy } from "lodash";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import toast from "react-hot-toast";
import { removeEmptyValues } from "@/utils";
import { TAXONOMY_QUERY } from "@/features/term_taxonomy/data";

export interface TaxonomyFormData {
  term_id: string;
  parent_id?: string;
  name: string;
  description?: string;
}

export const storeTaxonomy = ({ select, formData }: StoreTaxonomy) => {
  return supabase
    .from("term_taxonomy")
    .insert(formData)
    .select(select)
    .single()
    .throwOnError();
};

interface StoreTaxonomy {
  formData: TaxonomyFormData;
  select?: string;
}

export const useStoreTaxonomyMutation = <Type = TaxonomyAPIDataStructure>() => {
  const queryClient = useQueryClient();

  return useMutation<Type, Error, StoreTaxonomy>({
    mutationFn: async ({
      formData,
      select = TAXONOMY_QUERY,
    }: StoreTaxonomy): Promise<Type> => {
      const { data, error } = await storeTaxonomy({ select, formData });

      if (error) throw error;
      if (data === null) throw new Error("Data not found.");

      return data as unknown as Type;
    },
    onSuccess: (data) => {
      queryClient
        .getQueriesData<Type[]>({
          queryKey: [
            "taxonomy",
            {
              term_id: (data as any).term_id,
            },
          ],
          exact: false,
        })
        .forEach(([queryKey]) => {
          queryClient.setQueryData(
            queryKey,
            (prevData: TaxonomyAPIDataStructure[]) => {
              return sortBy([...(prevData || []), data], ["name"]);
            }
          );
        });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
