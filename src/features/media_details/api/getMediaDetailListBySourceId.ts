import { useQuery } from "@tanstack/react-query";
import { MediaDetailAPIDataStructure } from "@/features/media_details/types";
import { supabase } from "@/utils/supabase";
import { durationInMinutes } from "@/utils";

export const getMediaListBySourceId = (sourceId: string) => {
  return supabase
    .from("media_details")
    .select("id, name, source_id")
    .eq("source_id", sourceId);
};

export const useGetMediaDetailListBySourceId = (sourceId: string) =>
  useQuery({
    enabled: !!sourceId,
    staleTime: durationInMinutes(2),

    queryKey: ["media_details", sourceId],
    queryFn: async (): Promise<MediaDetailAPIDataStructure[]> => {
      const { data } = await getMediaListBySourceId(sourceId);

      return data ?? [];
    },
  });
