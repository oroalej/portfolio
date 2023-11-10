import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { useQuery } from "@tanstack/react-query";
import { Paginatable, Sortable, Tables } from "@/types";
import supabase from "@/utils/supabase";
import {
  dataWithPagination,
  generatePaginationData,
  getRange,
} from "@/utils/pagination";

type DaydreamListSortable = Pick<
  Tables<"daydreams">,
  "created_at" | "iso" | "year" | "aperture" | "shutter_speed"
>;

export interface getDaydreamListParams
  extends Required<Paginatable>,
    Sortable<DaydreamListSortable> {}

export const getDaydreamList = ({
  per_page,
  page,
  sort = [{ column: "created_at", order: "desc" }],
}: getDaydreamListParams) => {
  let query = supabase
    .from("daydreams")
    .select(
      "id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)",
      { count: "exact" }
    );

  sort.forEach((item) => {
    query = query.order(item.column, { ascending: item.order === "asc" });
  });

  if (Number.isInteger(page) && Number.isInteger(per_page)) {
    const { from, to } = getRange(Number(per_page), Number(page));

    query = query.range(from, to);
  }

  query = query.throwOnError();

  return query;
};

export const useGetDaydreamList = (params: getDaydreamListParams) =>
  useQuery({
    queryKey: ["daydreams", params],
    queryFn: async (): Promise<
      dataWithPagination<DaydreamAPIDataStructure>
    > => {
      const { data, count } = await getDaydreamList(params);

      return {
        data: (data as unknown as DaydreamAPIDataStructure[]) || [],
        pagination: generatePaginationData(
          Number(params.per_page),
          Number(params.page),
          count || 0
        ),
      };
    },
  });
