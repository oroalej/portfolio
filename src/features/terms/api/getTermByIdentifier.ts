import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { TermAPIDataStructure } from "@/features/terms/types";

export const getTermByIdentifier = (identifier: number) => {
  return supabase
    .from("terms")
    .select("id, name, identifier")
    .eq("identifier", identifier)
    .single()
    .throwOnError();
};

export const useGetTermByIdentifier = (identifier: number) =>
  useQuery({
    staleTime: Infinity,
    queryKey: ["term", [identifier]],
    queryFn: async (): Promise<TermAPIDataStructure> => {
      const { data } = await getTermByIdentifier(identifier);

      if (data === null) throw new Error("Data not found.");

      return data;
    },
  });
