import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { TermAPIDataStructure } from "@/features/terms/types";

export const getTermList = () => {
  return supabase.from("terms").select("id, name, identifier").throwOnError();
};

export const useGetTermList = () =>
  useQuery({
    staleTime: Infinity,
    queryKey: ["terms"],
    queryFn: async (): Promise<TermAPIDataStructure[]> => {
      const { data } = await getTermList();

      return data || [];
    },
  });
