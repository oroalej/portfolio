import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  queryFilterBuilder,
  queryPaginationBuilder,
  supabase,
} from "@/utils/supabase";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { Filterable, Paginatable, Searchable, Sortable, Tables } from "@/types";
import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
  generatePaginationData,
  getNextPaginationPageParam,
} from "@/utils/pagination";
import { durationInMinutes, removeEmptyValues } from "@/utils";
import { DAYDREAM_SELECT } from "@/features/daydreams/api/constants";

type DaydreamListSortable = Pick<
  Tables<"daydreams">,
  "created_at" | "iso" | "year" | "aperture" | "shutter_speed"
>;

type DaydreamListFilterable = Pick<Tables<"daydreams">, "year">;

export interface GetDaydreamListParams
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
}: GetDaydreamListParams) => {
  let query = supabase
    .from("daydreams")
    .select(DAYDREAM_SELECT, { count: "exact" });

  query = queryFilterBuilder({
    query,
    textSearch: { column: "description", value: q },
    sort,
    filter,
  });

  query = query.order("image_order", {
    foreignTable: "daydream_images",
    ascending: true,
  });

  query = queryPaginationBuilder({
    query,
    page,
    per_page,
  });

  return query.throwOnError();
};

export const useGetDaydreamList = <Type = DaydreamAPIDataStructure>(
  params: GetDaydreamListParams,
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

export const useInfiniteDaydreamList = ({
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
  page = DEFAULT_PAGINATION_VALUES.current_page,
  q,
  sort = [{ column: "created_at", order: "desc" }],
  filter = {},
}: GetDaydreamListParams) =>
  useInfiniteQuery({
    initialPageParam: page,
    staleTime: durationInMinutes(2),
    queryKey: [
      "infinite_daydreams",
      removeEmptyValues({ q, ...filter }),
      sort,
      per_page,
    ],
    queryFn: async ({ pageParam }) => {
      const { data, count } = await getDaydreamList({
        per_page,
        page: pageParam,
        q,
        sort,
        filter,
      });

      return {
        data: (data as unknown as DaydreamAPIDataStructure[]) || [],
        pagination: generatePaginationData(
          Number(per_page),
          Number(pageParam),
          count || 0
        ),
      };
    },
    getNextPageParam: getNextPaginationPageParam<DaydreamAPIDataStructure>,
  });
