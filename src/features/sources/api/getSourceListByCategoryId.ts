import { useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase";
import { SourceAPIDataStructure } from "@/features/sources/types";
import { durationInMinutes } from "@/utils";

export const getSourceListByCategoryId = (categoryId: string) => {
  return supabase
    .from("sources")
    .select("id, name, category_id")
    .eq("category_id", categoryId)
    .throwOnError();
};

export const useGetSourceListByCategoryId = (categoryId: string) =>
  useQuery({
    enabled: !!categoryId,
    staleTime: durationInMinutes(2),

    queryKey: ["quotes", categoryId],
    queryFn: async (): Promise<SourceAPIDataStructure[] | null> => {
      const { data } = await getSourceListByCategoryId(categoryId);

      return data as unknown as SourceAPIDataStructure[];
    },
  });
