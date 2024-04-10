import { Metadata } from "next";
import { BreadcrumbDataSetter } from "@/app/admin/(modules)/_components/Breadcrumbs";
import { Fragment } from "react";
import { CreateDataManagementWrapper } from "@/app/admin/(modules)/data-management/_components/CreateDataManagementWrapper";

export const metadata: Metadata = {
  title: "Admin - Data Management",
};

const DataManagementIndexPage = () => {
  return (
    <Fragment>
      <BreadcrumbDataSetter breadcrumbs={[{ content: "Data Management" }]} />

      <CreateDataManagementWrapper />
    </Fragment>
  );
};

export default DataManagementIndexPage;
