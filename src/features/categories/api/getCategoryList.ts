import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { CategoryAPIDataStructure } from "@/features/categories/types";
import { durationInMinutes } from "@/utils";

export const getCategoryList = () => {
  return supabase
    .from("categories")
    .select("id, name, slug")
    .order("name")
    .throwOnError();
};

export const useGetCategoryList = () =>
  useQuery({
    staleTime: durationInMinutes(2),

    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryAPIDataStructure[]> => {
      const { data } = await getCategoryList();

      return data ?? [];
    },
  });
