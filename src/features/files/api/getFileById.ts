import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { FileAPIDataStructure } from "@/features/files/types";

export const getFileById = (id: string) => {
  return supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();
};

export const useFileById = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ["file", id],
    queryFn: async () => {
      const { data } = await getFileById(id);

      return data as unknown as FileAPIDataStructure;
    },
  });
