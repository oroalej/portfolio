import { Metadata } from "next";
import { Fragment, Suspense } from "react";
import QuoteFormLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteFormLoading";
import EditQuoteWrapper from "@/app/admin/(modules)/quotes/[quoteId]/_components/EditQuoteWrapper";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";

interface AdminQuoteEditPage {
  params: { quoteId: string };
}

export const metadata: Metadata = {
  title: "Admin - Edit Quote",
};

const AdminQuoteEditPage = ({ params: { quoteId } }: AdminQuoteEditPage) => (
  <Fragment>
    <BreadcrumbDataSetter
      breadcrumbs={[
        { href: "/quotes", content: "All Quotes" },
        { content: quoteId },
      ]}
    />

    <Suspense
      fallback={
        <QuoteFormLoading title="Edit Quote" submitButtonText="Update" />
      }
    >
      <EditQuoteWrapper />
    </Suspense>
  </Fragment>
);

export default AdminQuoteEditPage;
