import { CardHeader, CardRoot, CardTitle } from "@/components";
import { Fragment } from "react";
import { Metadata } from "next";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { GoFileDirectoryFill } from "react-icons/go";
import ProjectCreateWrapper from "@/app/admin/projects/create/_components/ProjectCreateWrapper";

export const metadata: Metadata = {
  title: "Admin - Create Project",
};

const AdminProjectCreatePage = () => {
  return (
    <Fragment>
      <BreadcrumbDataSetter
        breadcrumbs={[
          { href: "/projects", content: "Projects" },
          { content: "Create" },
        ]}
      />

      <CardRoot rounded className="mb-2">
        <CardHeader>
          <CardTitle icon={<GoFileDirectoryFill />}>Create Project</CardTitle>
        </CardHeader>
      </CardRoot>
      <ProjectCreateWrapper />
    </Fragment>
  );
};

export default AdminProjectCreatePage;
