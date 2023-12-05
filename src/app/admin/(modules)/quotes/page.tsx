import { Metadata } from "next";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import QuoteFormLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteFormLoading";
import CreateQuoteWrapper from "@/app/admin/(modules)/quotes/_components/CreateQuoteWrapper";
import { Fragment, Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin - Quote List",
};

const AdminQuoteIndexPage = () => (
  <Fragment>
    <BreadcrumbDataSetter breadcrumbs={[{ content: "All Quotes" }]} />

    <Suspense
      fallback={
        <QuoteFormLoading title="Create Quote" submitButtonText="Create" />
      }
    >
      <CreateQuoteWrapper />
    </Suspense>
  </Fragment>
);

export default AdminQuoteIndexPage;
