import { Fragment } from "react";
import { ProjectCardLoading } from "@/app/(web)/(profession)/projects/_components/ProjectCard";

const ProjectLoading = () => (
  <Fragment>
    {[...Array(3)].map((_, key) => (
      <ProjectCardLoading key={`project-card-loading-${key}`} />
    ))}
  </Fragment>
);

export default ProjectLoading;
