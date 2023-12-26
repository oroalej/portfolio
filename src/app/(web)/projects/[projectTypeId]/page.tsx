import { Metadata } from "next";
import ProjectList from "@/app/(web)/projects/[projectTypeId]/_components/ProjectList";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Projects",
};

const ProjectSlugPage = () => <ProjectList />;

export default ProjectSlugPage;
