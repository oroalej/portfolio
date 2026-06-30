import { Metadata } from "next";
import { Fragment, Suspense } from "react";
import QuoteFormLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteFormLoading";
import EditQuoteWrapper from "@/app/admin/(modules)/quotes/[quoteId]/_components/EditQuoteWrapper";
import { BreadcrumbDataSetter } from "@/app/admin/(modules)/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Admin - Edit Quote",
};

const AdminQuoteEditPage = async ({
  params,
}: PageProps<"/admin/quotes/[quoteId]">) => {
  const { quoteId } = await params;

  return (
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
};

export default AdminQuoteEditPage;
