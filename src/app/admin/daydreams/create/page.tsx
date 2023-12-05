import { Metadata } from "next";
import { Fragment, Suspense } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import CreateDaydreamWrapper from "@/app/admin/daydreams/create/_components/CreateDaydreamWrapper";
import DaydreamFormLoading from "@/app/admin/daydreams/_components/Loading/DaydreamFormLoading";

export const metadata: Metadata = {
  title: "Admin - Create Dream",
};

const CreateDaydreamPage = () => {
  return (
    <Fragment>
      <BreadcrumbDataSetter
        breadcrumbs={[
          { href: "/daydreams", content: "All Dreams" },
          { content: "Create" },
        ]}
      />

      <Suspense
        fallback={
          <DaydreamFormLoading
            title="Create Daydream"
            submitButtonText="Submit"
          />
        }
      >
        <CreateDaydreamWrapper />
      </Suspense>
    </Fragment>
  );
};

export default CreateDaydreamPage;
