import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { generatePaginationData } from "@/utils/pagination";
import {
  queryFilterBuilder,
  queryPaginationBuilder,
  supabase,
} from "@/utils/supabase";
import { Buckets, FileAPIDataStructure } from "@/features/files/types";
import { Paginatable, Searchable } from "@/types";

export const getFiles = ({ bucket_name, page, per_page, q }: FileListProps) => {
  let query = supabase
    .from("files")
    .select("*", { count: "exact" })
    .eq("bucket_name", bucket_name);

  query = queryFilterBuilder({
    query,
    sort: [{ column: "created_at", order: "desc" }],
  });

  query = queryPaginationBuilder({
    query,
    page,
    per_page,
  });

  if (!!q) {
    query = query.ilike("name", `%${q}%`);
  }

  return query.throwOnError();
};

export interface FileListProps extends Required<Paginatable>, Searchable {
  bucket_name: Buckets;
}

export const useFileList = (params: FileListProps) =>
  useQuery({
    placeholderData: keepPreviousData,
    staleTime: Infinity,

    queryKey: ["files", params],
    queryFn: async () => {
      const { data, count } = await getFiles(params);

      return {
        data: (data as unknown as FileAPIDataStructure[]) || [],
        pagination: generatePaginationData(
          Number(params.per_page),
          Number(params.page),
          count || 0
        ),
      };
    },
  });
