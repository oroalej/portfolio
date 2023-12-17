import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Tables } from "@/types";
import { supabase } from "@/utils/supabase";
import { SourceAPIDataStructure } from "@/features/sources/types";
import { sortBy } from "lodash";

interface storeSourceParams
  extends Required<Pick<Tables<"sources">, "name" | "category_id">> {}

export const createSource = (formData: storeSourceParams) => {
  return supabase
    .from("sources")
    .insert(formData)
    .throwOnError()
    .select("id, name, category_id")
    .single()
    .throwOnError();
};

const toasterId = crypto.randomUUID();

export const useStoreSourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: storeSourceParams
    ): Promise<SourceAPIDataStructure> => {
      toast.loading(`Creating ${formData.name} source...`, { id: toasterId });

      const { data } = await createSource(formData);

      return data as unknown as SourceAPIDataStructure;
    },
    onSuccess: (data) => {
      toast.success("Your data has been successfully created!", {
        id: toasterId,
      });

      queryClient.setQueryData(["source", data!.id], data);
      queryClient.setQueryData<SourceAPIDataStructure[]>(
        ["sources", data.category_id],
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
