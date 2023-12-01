import { supabase } from "@/utils/supabase";
import { PropType, Tables } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface StoreProjectSkillsMutationProps {
  formData: Omit<Tables<"project_screenshots">, "description" | "id">[];
}

export const storeProjectScreenshots = (
  value: PropType<StoreProjectSkillsMutationProps, "formData">
) => {
  return supabase.from("project_screenshots").insert(value).throwOnError();
};

export const useStoreProjectScreenshotsMutation = () => {
  return useMutation({
    mutationFn: async ({
      formData,
    }: StoreProjectSkillsMutationProps): Promise<void> => {
      await storeProjectScreenshots(formData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
