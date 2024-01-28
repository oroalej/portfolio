import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
  generatePaginationData,
} from "@/utils/pagination";
import { FileListProps, getFiles } from "@/features/files/api/getFileList";
import { FileAPIDataStructure } from "@/features/files/types";
import { removeEmptyValues } from "@/utils";

export const useInfiniteFileList = ({
  bucket_name,
  page = DEFAULT_PAGINATION_VALUES.current_page,
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
  q,
  filter = {},
}: FileListProps) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    {
      staleTime: Infinity,
      initialPageParam: page,
      queryKey: ["infinite_files", { q, ...removeEmptyValues(filter) }],
      queryFn: async ({ pageParam }) => {
        const { data, count } = await getFiles({
          page: pageParam,
          bucket_name,
          per_page,
          q,
          filter,
        });

        return {
          data: (data as unknown as FileAPIDataStructure[]) ?? [],
          pagination: generatePaginationData(per_page, pageParam, count || 0),
        };
      },

      getNextPageParam: (lastPage) => {
        const pagination = (
          lastPage as DataWithPagination<FileAPIDataStructure>
        ).pagination;

        const nextPage = pagination.current_page + 1;

        if (pagination.last_page >= nextPage) {
          return nextPage;
        }

        return undefined;
      },
      getPreviousPageParam: (
        firstPage,
        allPages,
        firstPageParam,
        allPageParams
      ) => {
        const prevPage =
          (allPageParams.pop() ?? DEFAULT_PAGINATION_VALUES.current_page) - 1;

        if (firstPageParam <= prevPage) {
          return prevPage;
        }

        return undefined;
      },
    },
    queryClient
  );
};
