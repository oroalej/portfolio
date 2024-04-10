import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sortBy } from "lodash";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import toast from "react-hot-toast";
import { removeEmptyValues } from "@/utils";

export interface TaxonomyFormData {
  term_id: string;
  parent_id?: string;
  name: string;
  description?: string;
}

export const storeTaxonomy = (formData: TaxonomyFormData) => {
  return supabase
    .from("term_taxonomy")
    .insert(formData)
    .select("*")
    .single()
    .throwOnError();
};

export const useStoreTaxonomyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: TaxonomyFormData
    ): Promise<TaxonomyAPIDataStructure> => {
      const { data } = await storeTaxonomy(formData);

      if (data === null) {
        throw new Error("Data not found.");
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient
        .getQueriesData<TaxonomyAPIDataStructure[]>({
          queryKey: [
            "taxonomy",
            {
              term_id: data.term_id,
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
