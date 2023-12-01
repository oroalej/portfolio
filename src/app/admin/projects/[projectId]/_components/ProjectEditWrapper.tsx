"use client";

import {
  DEFAULT_PROJECT_FORM_VALUES,
  ProjectForm,
  ProjectFormParams,
} from "@/app/admin/projects/_components/ProjectForm";
import { useUpdateProjectMutation } from "@/features/projects/api/updateProject";
import { useDeleteProjectSkillsMutation } from "@/features/projects/api/junctions/skills/deleteProjectSkills";
import { useStoreProjectSkillsMutation } from "@/features/projects/api/junctions/skills/storeProjectSkills";
import { useGetProjectById } from "@/features/projects/api/getProjectById";
import { useCallback, useMemo } from "react";
import { projectFormItemTransformer } from "@/features/projects/transformers";
import { ProjectAPIDataStructure } from "@/features/projects/types";
import { difference } from "lodash";
import { useDeleteProjectScreenshotsMutation } from "@/features/projects/api/junctions/screenshots/deleteProjectScreenshots";
import { ProjectFormLoading } from "@/app/admin/projects/_components/Loading/ProjectFormLoading";
import {
  UpsertScreenshotItem,
  useUpsertProjectScreenshotsMutation,
} from "@/features/projects/api/junctions/screenshots/upsertProjectScreenshots";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ProjectEditWrapper {
  projectId: string;
}

const ProjectEditWrapper = ({ projectId }: ProjectEditWrapper) => {
  const updateProjectMutation = useUpdateProjectMutation();
  const storeProjectSkillsMutation = useStoreProjectSkillsMutation();
  const upsertProjectScreenshotsMutation =
    useUpsertProjectScreenshotsMutation();
  const deleteProjectSkillsMutation = useDeleteProjectSkillsMutation();
  const deleteProjectScreenshotsMutation =
    useDeleteProjectScreenshotsMutation();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetProjectById(projectId);

  const memoizedData: ProjectFormParams = useMemo(() => {
    if (data)
      return projectFormItemTransformer(data as ProjectAPIDataStructure);

    return { ...DEFAULT_PROJECT_FORM_VALUES };
  }, [data]);

  const onSubmitHandler = useCallback(
    async (value: ProjectFormParams) => {
      toast.loading("Updating project...", { id: projectId });

      const newlyAddedSkills = difference(value.skills, memoizedData?.skills);
      const removedSkills = difference(memoizedData?.skills, value.skills);
      let deletedScreenshots: string[] = [];
      let upsertScreenshots: UpsertScreenshotItem[] = [];

      try {
        await updateProjectMutation.mutateAsync({
          id: projectId,
          formData: value,
        });

        if (!!removedSkills.length) {
          let projectSkillIds: string[] = [];

          removedSkills.map((skillId) => {
            const entry = (data as ProjectAPIDataStructure).skills.find(
              (skill) => skill.skill_id === skillId
            );

            if (entry) {
              projectSkillIds.push(entry.id);
            }
          });

          await deleteProjectSkillsMutation.mutateAsync({
            formData: projectSkillIds,
          });
        }

        if (!!newlyAddedSkills.length) {
          await storeProjectSkillsMutation.mutateAsync({
            formData: newlyAddedSkills.map((skillId) => ({
              skill_id: skillId,
              project_id: projectId,
            })),
          });
        }

        deletedScreenshots = value.screenshots
          .filter((screenshot) => screenshot.is_deleted)
          .map((screenshot) => screenshot.id as string);

        upsertScreenshots = value.screenshots
          .filter((screenshot) => !screenshot.is_deleted)
          .map((screenshot, index) => {
            const entry: UpsertScreenshotItem = {
              file_id: screenshot.file_id,
              title: screenshot.title,
              screenshot_order: index + 1,
              project_id: projectId,
            };

            if (!screenshot.is_created) {
              entry.id = screenshot.id;
            }

            return entry;
          });

        if (!!deletedScreenshots.length) {
          await deleteProjectScreenshotsMutation.mutateAsync(
            deletedScreenshots
          );
        }

        if (!!upsertScreenshots.length) {
          await upsertProjectScreenshotsMutation.mutateAsync(upsertScreenshots);
        }

        await queryClient.invalidateQueries({
          queryKey: ["project", projectId],
          exact: true,
        });

        queryClient.removeQueries({
          queryKey: ["projects"],
          exact: false,
        });

        toast.success("Your data has been successfully updated!", {
          id: projectId,
        });
      } catch (error) {
        // toast.error(error);
      }
    },
    [data]
  );

  if (!data || isLoading) return <ProjectFormLoading />;

  return (
    <ProjectForm
      onSubmit={onSubmitHandler}
      submitButtonText="Edit Project"
      item={memoizedData}
    />
  );
};

export default ProjectEditWrapper;
