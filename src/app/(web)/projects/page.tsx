import RedirectToProjectTypeId from "@/app/(web)/projects/[projectTypeId]/_components/RedirectToProjectTypeId";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Projects",
};

const ProjectPage = () => <RedirectToProjectTypeId />;

export default ProjectPage;
