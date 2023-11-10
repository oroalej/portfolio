import { useQuery } from "@tanstack/react-query";
import { CategoryAPIDataStructure } from "@/features/categories/types";
import supabase from "@/utils/supabase";

export const getCategoryById = (id: string) => {
  return supabase
    .from("categories")
    .select("id, name, slug")
    .eq("id", id)
    .single()
    .throwOnError();
};

export const useGetCategory = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ["category", id],
    queryFn: async (): Promise<CategoryAPIDataStructure> => {
      const { data } = await getCategoryById(id);

      if (data === null) throw new Error("Data not found.");

      return data;
    },
  });
