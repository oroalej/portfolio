import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { durationInMinutes } from "@/utils";

export const getStoragePublicUrl = (path: string) => {
  return supabase.storage.from("images").getPublicUrl(path);
};

export const useStoragePublicUrl = (path: string | undefined) =>
  useQuery({
    enabled: !!path,
    staleTime: durationInMinutes(2),

    queryKey: ["file", path],
    queryFn: async (): Promise<string> => {
      const { data } = getStoragePublicUrl(path as string);

      return data.publicUrl;
    },
  });
