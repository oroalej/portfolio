import { Fragment } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { Metadata } from "next";
import IndexProjectListWrapper from "@/app/admin/projects/_components/IndexProjectListWrapper";
import IndexProjectHeader from "@/app/admin/projects/_components/IndexProjectHeader";

export const metadata: Metadata = {
  title: "Admin - Projects",
};

const AdminProjectPage = () => (
  <Fragment>
    <BreadcrumbDataSetter breadcrumbs={[{ content: "Projects" }]} />

    <IndexProjectHeader />
    <IndexProjectListWrapper />
  </Fragment>
);

export default AdminProjectPage;
