import { supabase } from "@/utils/supabase";
import { PropType, Tables } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface StoreProjectSkillsMutationProps {
  formData: Pick<Tables<"project_skills">, "project_id" | "skill_id">[];
}

export const storeProjectSkills = (
  value: PropType<StoreProjectSkillsMutationProps, "formData">
) => {
  return supabase.from("project_skills").insert(value).throwOnError();
};

export const useStoreProjectSkillsMutation = () => {
  return useMutation({
    mutationFn: async ({
      formData,
    }: StoreProjectSkillsMutationProps): Promise<void> => {
      await storeProjectSkills(formData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
