import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { ProjectFormParams } from "@/app/admin/(modules)/projects/_components/ProjectForm";

export const storeProject = async ({
  design_link,
  repository_link,
  website_link,
  screenshots,
  ...remaining
}: ProjectFormParams) => {
  const { data: projectId } = await supabase
    .rpc("store_project", {
      design_link: design_link ?? undefined,
      repository_link: repository_link ?? undefined,
      website_link: website_link ?? undefined,
      screenshots,
      ...remaining,
    })
    .throwOnError();

  return projectId;
};

export const useStoreProjectMutation = () => {
  return useMutation({
    mutationFn: async (formData: ProjectFormParams): Promise<string> => {
      const data = await storeProject(formData);

      if (data === null) {
        throw new Error("Data not found.");
      }

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
