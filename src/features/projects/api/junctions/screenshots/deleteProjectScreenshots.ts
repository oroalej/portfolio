import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const deleteProjectScreenshots = (value: string[]) => {
  return supabase
    .from("project_screenshots")
    .delete()
    .in("id", value)
    .throwOnError();
};

export const useDeleteProjectScreenshotsMutation = () => {
  return useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      await deleteProjectScreenshots(ids);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
