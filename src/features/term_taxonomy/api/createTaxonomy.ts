import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sortBy } from "lodash";
import { supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import toast from "react-hot-toast";

export interface TaxonomyFormData {
  term_id: string;
  parent_id?: string;
  name: string;
}

export const storeTaxonomy = (formData: TaxonomyFormData) => {
  return supabase
    .from("term_taxonomy")
    .insert(formData)
    .select("id, term_id, parent_id, name")
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
      queryClient.setQueryData(
        [
          "taxonomy",
          { parent_id: data.parent_id ?? "", term_id: data.term_id },
        ],
        (prevData: TaxonomyAPIDataStructure[]) => {
          const localPrevDataState = prevData || [];

          localPrevDataState.push(data);

          return sortBy(localPrevDataState, ["name"]);
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
