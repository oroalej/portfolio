import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { CardHeader, CardRoot, CardTitle } from "@/components";
import { GoFileDirectoryFill } from "react-icons/go";
import { Fragment } from "react";
import { Metadata } from "next";
import ProjectEditWrapper from "@/app/admin/projects/[projectId]/_components/ProjectEditWrapper";

export const metadata: Metadata = {
  title: "Admin - Edit Project",
};

interface AdminProjectEditPageProps {
  params: { projectId: string };
}

const AdminProjectEditPage = ({
  params: { projectId },
}: AdminProjectEditPageProps) => {
  return (
    <Fragment>
      <BreadcrumbDataSetter
        breadcrumbs={[
          { href: "/projects", content: "Projects" },
          { content: projectId },
        ]}
      />

      <CardRoot rounded className="mb-2">
        <CardHeader>
          <CardTitle icon={<GoFileDirectoryFill />}>Edit Project</CardTitle>
        </CardHeader>
      </CardRoot>

      <ProjectEditWrapper projectId={projectId} />
    </Fragment>
  );
};

export default AdminProjectEditPage;
