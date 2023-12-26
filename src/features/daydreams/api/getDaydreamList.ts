import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  queryFilterBuilder,
  queryPaginationBuilder,
  supabase,
} from "@/utils/supabase";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { Filterable, Paginatable, Searchable, Sortable, Tables } from "@/types";
import { DataWithPagination, generatePaginationData } from "@/utils/pagination";

type DaydreamListSortable = Pick<
  Tables<"daydreams">,
  "created_at" | "iso" | "year" | "aperture" | "shutter_speed"
>;

type DaydreamListFilterable = Pick<Tables<"daydreams">, "year">;

export interface getDaydreamListParams
  extends Required<Paginatable>,
    Sortable<DaydreamListSortable>,
    Filterable<DaydreamListFilterable>,
    Searchable {}

export const getDaydreamList = ({
  q,
  per_page,
  page,
  sort = [{ column: "created_at", order: "desc" }],
  filter = {},
}: getDaydreamListParams) => {
  let query = supabase
    .from("daydreams")
    .select(
      "id, year, description, iso, shutter_speed, aperture, created_at, file:file_id(id, name, width, height, size, storage_file_path, type)",
      { count: "exact" }
    );

  query = queryFilterBuilder({
    query,
    textSearch: { column: "description", value: q },
    sort,
    filter,
  });

  query = queryPaginationBuilder({
    query,
    page,
    per_page,
  });

  query = query.throwOnError();

  return query;
};

export const useGetDaydreamList = <Type extends any = DaydreamAPIDataStructure>(
  params: getDaydreamListParams,
  transformer?: (value: DaydreamAPIDataStructure[]) => Type[]
) =>
  useQuery({
    queryKey: ["daydreams", params],
    placeholderData: keepPreviousData,

    queryFn: async (): Promise<DataWithPagination<Type>> => {
      const { data, count } = await getDaydreamList(params);

      return {
        data: (data as unknown as Type[]) || [],
        pagination: generatePaginationData(
          Number(params.per_page),
          Number(params.page),
          count || 0
        ),
      };
    },
    select: (data): DataWithPagination<Type> => {
      if (transformer) {
        return {
          data: transformer((data?.data as DaydreamAPIDataStructure[]) || []),
          pagination: data.pagination,
        };
      }

      return data as DataWithPagination<Type>;
    },
  });
