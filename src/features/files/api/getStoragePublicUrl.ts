import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const getStoragePublicUrl = (path: string) => {
  return supabase.storage.from("images").getPublicUrl(path);
};

export const useStoragePublicUrl = (path: string | undefined) =>
  useQuery({
    enabled: !!path,
    staleTime: Infinity,

    queryKey: ["file", path],
    queryFn: async (): Promise<string> => {
      const { data } = getStoragePublicUrl(path as string);

      return data.publicUrl;
    },
  });
