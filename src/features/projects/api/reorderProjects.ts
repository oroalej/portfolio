import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";

export interface ReorderProjectItem {
  id: string;
  project_order: number;
  title: string;
  description: string;
  project_type_id: string;
}

export interface ReorderProjectsProps {
  items: ReorderProjectItem[];
}

export const reorderProjects = (items: ReorderProjectItem[]) => {
  return supabase
    .from("projects")
    .upsert(items, {
      onConflict: "id",
    })
    .throwOnError();
};

export const useReorderProjectsMutation = () => {
  const id = crypto.randomUUID();

  return useMutation({
    mutationFn: async ({ items }: ReorderProjectsProps): Promise<void> => {
      await reorderProjects(items);
    },
    onSuccess: () => {
      toast.success("You successfully rearranged your projects!", { id });
    },
    onError: (error) => {
      toast.error(error.message, { id });
    },
  });
};
