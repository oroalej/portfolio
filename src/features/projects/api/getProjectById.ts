import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { ProjectAPIDataStructure } from "@/features/projects/types";

export const getProjectById = (id: string) => {
  return supabase
    .from("projects")
    .select(
      "title, description, website_link, design_link, repository_link, project_order, project_type_id, screenshots:project_screenshots(id, title, file_id, screenshot_order), skills:project_skills(id, skill_id)"
    )
    .eq("id", id)
    .order("screenshot_order", {
      foreignTable: "project_screenshots",
    })
    .single()
    .throwOnError();
};

export const useGetProjectById = <TransformerType>(
  id: string,
  transformer?: (value: ProjectAPIDataStructure) => TransformerType
) => {
  const queryClient = useQueryClient();

  return useQuery({
    enabled: !!id,
    queryKey: ["project", id],
    queryFn: async (): Promise<ProjectAPIDataStructure> => {
      const { data } = await getProjectById(id);

      if (data === null) throw new Error("Data not found");

      return data as unknown as ProjectAPIDataStructure;
    },
    select: (data) => {
      if (data && transformer)
        return transformer(data as ProjectAPIDataStructure);

      return data;
    },
    initialData: (): ProjectAPIDataStructure | undefined => {
      const cacheQuery = queryClient.getQueryCache().findAll({
        queryKey: ["projects"],
        exact: false,
      });

      if (!!cacheQuery.length) {
        let selectedItem: ProjectAPIDataStructure | undefined = undefined;

        cacheQuery.forEach((cache) => {
          selectedItem =
            (
              queryClient.getQueryData(
                cache.queryKey
              ) as ProjectAPIDataStructure[]
            )?.find((item) => item.id === id) ?? undefined;

          if (!!selectedItem) {
            return;
          }
        });

        return selectedItem;
      }

      return undefined;
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["projects"])?.dataUpdatedAt,
  });
};
