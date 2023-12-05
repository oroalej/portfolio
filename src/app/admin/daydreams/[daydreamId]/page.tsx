import EditDaydreamWrapper from "@/app/admin/daydreams/[daydreamId]/_components/EditDaydreamWrapper";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { Metadata } from "next";
import { Fragment, Suspense } from "react";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";

export const metadata: Metadata = {
  title: "Admin - Editing dream..",
};

const AdminDaydreamEditPage = () => {
  return (
    <Fragment>
      <BreadcrumbDataSetter
        breadcrumbs={[
          { href: "/dreams", content: "All Dreams" },
          { content: "Create" },
        ]}
      />

      <Suspense
        fallback={
          <DaydreamFormLoading
            title="Edit Daydream"
            submitButtonText="Update Dream"
          />
        }
      >
        <EditDaydreamWrapper />
      </Suspense>
    </Fragment>
  );
};

export default AdminDaydreamEditPage;
