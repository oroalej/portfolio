import type { QueryClient } from "@tanstack/react-query";

export const DEFAULT_PAGINATION_VALUES = {
  last_page: 1,
  total: 1,
  per_page: 20,
  current_page: 1,
  from: 1,
  to: 1,
};

export interface Range {
  from: number;
  to: number;
}

export interface DataWithPagination<Structure> {
  data: Structure[];
  pagination: PaginationProps;
}

export interface PaginationProps extends Range {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export const getRange = (per_page: number, current_page: number): Range => ({
  from: current_page * per_page - per_page,
  to: current_page * per_page - 1,
});

export const generatePaginationData = (
  per_page: number,
  current_page: number,
  total: number
): PaginationProps => {
  const { from, to } = getRange(per_page, current_page);

  return {
    last_page: Math.ceil(total / per_page),
    total,
    per_page,
    current_page,
    from: from + 1,
    to: to >= total ? total : to + 1,
  };
};

interface updatePaginatedDataCache<T extends { id: string }> {
  queryClient: QueryClient;
  queryKey: any[];
  data: T;
}

export const updatePaginatedDataCache = <
  T extends { id: string } = { id: string }
>({
  queryClient,
  queryKey,
  data,
}: updatePaginatedDataCache<T>) => {
  const cacheQuery = queryClient.getQueryCache().find({
    queryKey: queryKey,
    exact: false,
    type: "active",
  });

  if (cacheQuery) {
    queryClient.setQueryData(
      cacheQuery.queryKey,
      (oldValue: DataWithPagination<T>) => {
        if (oldValue) {
          return {
            ...oldValue,
            data:
              oldValue?.data.map((item) => {
                if (item.id === data.id) {
                  return data;
                }

                return item;
              }) ?? [],
          };
        }
      }
    );
  }
};
