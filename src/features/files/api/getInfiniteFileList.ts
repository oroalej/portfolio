import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Paginatable } from "@/types";
import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
  generatePaginationData,
} from "@/utils/pagination";
import { FileListProps, getFiles } from "@/features/files/api/getFileList";
import { FileAPIDataStructure } from "@/features/files/types";

export interface InfiniteFileListProps
  extends Pick<FileListProps, "bucket_name">,
    Paginatable {}

export const useInfiniteFileList = ({
  bucket_name,
  page = DEFAULT_PAGINATION_VALUES.current_page,
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
}: InfiniteFileListProps) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    {
      enabled: !!page,
      staleTime: Infinity,
      initialPageParam: page,
      queryKey: ["infinite_files", { per_page, page }],
      queryFn: async ({ pageParam }) => {
        const { data, count } = await getFiles({
          page: pageParam,
          bucket_name,
          per_page,
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
        const prevPage = (allPageParams.pop() ?? 1) - 1;

        if (firstPageParam <= prevPage) {
          return prevPage;
        }

        return undefined;
      },
    },
    queryClient
  );
};
