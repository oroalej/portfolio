import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "@/utils/supabase";
import { titleCase } from "@/utils";
import { kebabCase, sortBy } from "lodash";
import { CategoryAPIDataStructure } from "@/features/categories/types";

export interface storeCategoryParams {
  name: string;
}

export const storeCategory = (formData: storeCategoryParams) => {
  return supabase
    .from("categories")
    .insert({
      name: titleCase(formData.name),
      slug: kebabCase(formData.name.toLowerCase()),
    })
    .select("id, name, slug")
    .single()
    .throwOnError();
};

const toasterId = crypto.randomUUID();

export const useStoreCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: storeCategoryParams
    ): Promise<CategoryAPIDataStructure> => {
      toast.loading(`Creating ${formData.name} category...`, { id: toasterId });

      const { data } = await storeCategory(formData);

      if (data === null) {
        throw new Error("Something went wrong, data not found.");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Your data has been successfully created!", {
        id: toasterId,
      });

      queryClient.setQueryData(["category", data.id], data);
      queryClient.setQueryData<CategoryAPIDataStructure[]>(
        ["categories"],
        (oldData) => {
          if (oldData) {
            oldData.push(data);

            return sortBy(oldData, ["name"]);
          }
        }
      );
    },
    onError: (error) => {
      toast.error(error.message, { id: toasterId });
    },
  });
};
