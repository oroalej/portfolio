import { useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";

export const getDaydreamById = (id: string) => {
  return supabase
    .from("daydreams")
    .select(
      "id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)"
    )
    .eq("id", id)
    .single()
    .throwOnError();
};

export const useGetDaydreamById = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ["daydream", id],
    queryFn: async (): Promise<DaydreamAPIDataStructure> => {
      const { data } = await getDaydreamById(id);

      if (data === null) throw new Error("Data not found.");

      return data as unknown as DaydreamAPIDataStructure;
    },
  });
