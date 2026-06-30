import { Metadata } from "next";
import { ProjectList } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectList";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Projects",
};

const ProjectSlugPage = async ({
  params,
}: PageProps<"/projects/[projectTypeId]">) => {
  const { projectTypeId } = await params;

  return <ProjectList projectTypeId={projectTypeId} />;
};

export default ProjectSlugPage;
