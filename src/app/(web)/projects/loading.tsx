import { ProjectCardLoading } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectCard";

const ProjectPageLoading = () => (
  <div className="flex flex-col gap-8">
    {[...Array(3)].map((_, key) => (
      <ProjectCardLoading key={`project-card-loading-${key}`} />
    ))}
  </div>
);

export default ProjectPageLoading;
