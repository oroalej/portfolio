import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Tables } from "@/types";
import { supabase } from "@/utils/supabase";
import { titleCase } from "@/utils";
import { sortBy } from "lodash";
import { MediaDetailAPIDataStructure } from "@/features/media_details/types";

interface storeMediaDetailParams
  extends Pick<Tables<"media_details">, "name" | "source_id"> {}

const toasterId = crypto.randomUUID();

export const storeMediaDetail = (formData: storeMediaDetailParams) => {
  return supabase
    .from("media_details")
    .insert({
      source_id: formData.source_id,
      name: titleCase(formData.name),
    })
    .select("id, name, source_id")
    .single()
    .throwOnError();
};

export const useStoreMediaDetailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: storeMediaDetailParams
    ): Promise<MediaDetailAPIDataStructure> => {
      toast.loading(`Creating ${formData.name} detail...`, { id: toasterId });

      const { data } = await storeMediaDetail(formData);

      if (data === null) {
        throw new Error("Something went wrong, data not found.");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Your data has been successfully created!", {
        id: toasterId,
      });

      queryClient.setQueryData<MediaDetailAPIDataStructure[]>(
        ["media_details", data.source_id],
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
