"use client";

import { useStoreProjectMutation } from "@/features/projects/api/createProject";
import toast from "react-hot-toast";
import {
  ProjectForm,
  ProjectFormParams,
} from "@/app/admin/projects/_components/ProjectForm";

const ProjectCreateWrapper = () => {
  const storeProjectMutation = useStoreProjectMutation();

  const onSubmitHandler = async (value: ProjectFormParams) => {
    await toast.promise(
      storeProjectMutation.mutateAsync({
        ...value,
        screenshots:
          value.screenshots?.map((screenshot, index) => ({
            file_id: screenshot.file_id,
            title: screenshot.title,
            screenshot_order: index + 1,
          })) ?? [],
      }),
      {
        success: "Your data has been successfully created!",
        loading: "Creating project...",
        error: (error) => error,
      }
    );
  };

  return (
    <ProjectForm onSubmit={onSubmitHandler} submitButtonText="Create Project" />
  );
};

export default ProjectCreateWrapper;
