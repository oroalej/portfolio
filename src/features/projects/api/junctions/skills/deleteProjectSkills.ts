import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const deleteProjectSkills = (value: string[]) => {
  return supabase
    .from("project_skills")
    .delete()
    .in("id", value)
    .throwOnError();
};

export interface DeleteProjectSkillsMutationProps {
  formData: string[];
}

export const useDeleteProjectSkillsMutation = () => {
  return useMutation({
    mutationFn: async ({
      formData,
    }: DeleteProjectSkillsMutationProps): Promise<void> => {
      await deleteProjectSkills(formData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
