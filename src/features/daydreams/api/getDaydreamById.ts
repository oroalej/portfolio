import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { durationInMinutes } from "@/utils";
import { DAYDREAM_SELECT } from "@/features/daydreams/api/constants";

export const getDaydreamById = (id: string) => {
  return supabase
    .from("daydreams")
    .select(DAYDREAM_SELECT)
    .eq("id", id)
    .order("image_order", {
      foreignTable: "daydream_images",
      ascending: true,
    })
    .single()
    .throwOnError();
};

export const useGetDaydreamById = (id: string) =>
  useQuery({
    enabled: !!id,
    staleTime: durationInMinutes(2),

    queryKey: ["daydream", id],
    queryFn: async (): Promise<DaydreamAPIDataStructure> => {
      const { data } = await getDaydreamById(id);

      if (data === null) throw new Error("Data not found.");

      return data as unknown as DaydreamAPIDataStructure;
    },
  });
