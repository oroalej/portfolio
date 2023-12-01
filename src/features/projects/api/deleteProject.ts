import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export const deleteProject = (id: string) => {
  return supabase.from("projects").delete().eq("id", id).throwOnError();
};

export const useDeleteProjectMutation = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await deleteProject(id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
