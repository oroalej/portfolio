import { useQuery } from "@tanstack/react-query";
import { MediaDetailAPIDataStructure } from "@/features/media_details/types";
import { supabase } from "@/utils/supabase";

export const getMediaDetailById = (id: string) => {
  return supabase
    .from("media_details")
    .select("id, name, source_id")
    .eq("id", id)
    .throwOnError();
};

export const useGetMediaDetailById = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ["media_detail", id],
    queryFn: async (): Promise<MediaDetailAPIDataStructure> => {
      const { data } = await getMediaDetailById(id);

      if (data === null) throw new Error("Data not found.");

      return data as unknown as MediaDetailAPIDataStructure;
    },
  });
