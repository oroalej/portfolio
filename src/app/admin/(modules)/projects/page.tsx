import { Fragment } from "react";
import { BreadcrumbDataSetter } from "src/app/admin/(modules)/_components/Breadcrumbs";
import { Metadata } from "next";
import IndexProjectListWrapper from "@/app/admin/(modules)/projects/_components/IndexProjectListWrapper";
import IndexProjectHeader from "@/app/admin/(modules)/projects/_components/IndexProjectHeader";

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
