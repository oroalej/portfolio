import { useMutation } from "@tanstack/react-query";
import { ProjectFormParams } from "@/app/admin/projects/_components/ProjectForm";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export const updateProject = (
  formData: Omit<ProjectFormParams, "skills" | "screenshots">,
  id: string
) => {
  return supabase.from("projects").update(formData).eq("id", id).throwOnError();
};

interface UpdateProjectMutation {
  id: string;
  formData: ProjectFormParams;
}

export const useUpdateProjectMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData: { skills, screenshots, ...projectData },
    }: UpdateProjectMutation): Promise<void> => {
      await updateProject(projectData, id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
