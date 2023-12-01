import { useQuery } from "@tanstack/react-query";
import { queryFilterBuilder, supabase } from "@/utils/supabase";
import { ProjectAPIDataStructure } from "@/features/projects/types";
import { Filterable, Searchable, Sortable, Tables } from "@/types";

export type ProjectFilterableColumns = Pick<
  Tables<"projects">,
  "project_type_id"
>;

export type ProjectSortableColumns = Pick<
  Tables<"projects">,
  "project_order" | "created_at"
>;

export interface GetProjectListParams
  extends Filterable<ProjectFilterableColumns>,
    Sortable<ProjectSortableColumns>,
    Searchable {}

export const getProjectList = async ({
  filter,
  q,
  sort,
}: GetProjectListParams) => {
  let query = supabase
    .from("projects")
    .select(
      "*, screenshots:project_screenshots(id, file_id, screenshot_order, file:file_id(id, name, bucket_name, storage_file_path), title), project_type:project_type_id(name), skills:project_skills(id, skill_id, skill:skill_id(name))"
    );

  query = queryFilterBuilder({
    textSearch: { column: "title", value: q },
    sort,
    query,
    filter,
  });

  query = query.throwOnError();

  return query;
};

export const useGetProjectList = <
  TransformerType extends {} = ProjectAPIDataStructure
>(
  params: GetProjectListParams,
  transformer?: (value: ProjectAPIDataStructure[]) => TransformerType
) =>
  useQuery({
    staleTime: Infinity,

    queryKey: ["projects", params],
    queryFn: async (): Promise<ProjectAPIDataStructure[]> => {
      const { data } = await getProjectList(params);

      return (data as unknown as ProjectAPIDataStructure[]) ?? [];
    },
    select: (data) => {
      if (transformer) return transformer(data);

      return data;
    },
  });
