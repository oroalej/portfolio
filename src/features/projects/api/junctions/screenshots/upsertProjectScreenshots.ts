import { supabase } from "@/utils/supabase";
import { Tables } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface UpsertScreenshotItem
  extends Omit<Tables<"project_screenshots">, "description" | "id">,
    Partial<Pick<Tables<"project_screenshots">, "id">> {}

export const upsertProjectScreenshots = (value: UpsertScreenshotItem[]) => {
  return supabase
    .from("project_screenshots")
    .upsert(value, {
      onConflict: "id",
      defaultToNull: false,
    })
    .throwOnError();
};

export const useUpsertProjectScreenshotsMutation = () => {
  return useMutation({
    mutationFn: async (value: UpsertScreenshotItem[]): Promise<void> => {
      await upsertProjectScreenshots(value);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
