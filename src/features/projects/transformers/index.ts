import { ProjectAPIDataStructure } from "@/features/projects/types";
import { ProjectFormParams } from "@/app/admin/projects/_components/ProjectForm";
import { ProjectCardItem } from "@/app/admin/projects/_components/ProjectCard";

export const ProjectListSelector = (data: ProjectAPIDataStructure[]) => {
  return data.map(projectListItemTransformer);
};

export const projectListItemTransformer = (
  item: ProjectAPIDataStructure
): ProjectCardItem => ({
  id: item.id,
  title: item.title,
  description: item.description,
  project_order: item.project_order,
  design_link: item.design_link,
  website_link: item.website_link,
  repository_link: item.repository_link,
  project_type: {
    id: item.project_type_id,
    ...item.project_type,
  },
  skills: item.skills.map((skill) => ({
    id: skill.skill_id,
    name: skill.skill.name,
  })),
  screenshots: item.screenshots.map((screenshot) => ({
    storage_file_path: screenshot.file.storage_file_path,
    name: screenshot.title,
  })),
});

export const projectFormItemTransformer = (
  item: ProjectAPIDataStructure
): ProjectFormParams => ({
  title: item.title,
  description: item.description,
  design_link: item.design_link,
  website_link: item.website_link,
  repository_link: item.repository_link,
  project_type_id: item.project_type_id,
  skills: item.skills.map((skill) => skill.skill_id),
  screenshots: item.screenshots.map((screenshot) => ({
    id: screenshot.id,
    title: screenshot.title,
    screenshot_order: screenshot.screenshot_order,
    file_id: screenshot.file_id,
  })),
});
