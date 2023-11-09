import { Button } from "@/components";
import { Metadata } from "next";
import { Suspense } from "react";
import QuoteFormLoading from "@/app/admin/quotes/_components/QuoteFormLoading";
import EditQuoteWrapper from "@/app/admin/quotes/[quoteId]/_components/EditQuoteWrapper";

export const metadata: Metadata = {
  title: "Admin - Edit Quote",
};

const AdminQuoteEditPage = () => (
  <div className="py-14 max-w-xl mx-auto">
    <div className="mb-8">
      <Button href="/admin/quotes">Back to list</Button>
    </div>

    <Suspense
      fallback={
        <QuoteFormLoading
          title="Edit Quote"
          cancelButtonText="Reset"
          submitButtonText="Update"
        />
      }
    >
      <EditQuoteWrapper />
    </Suspense>
  </div>
);

export default AdminQuoteEditPage;
