import CreateQuoteWrapper from "@/app/admin/quotes/create/_components/CreateQuoteWrapper";
import { Button } from "@/components";
import { Metadata } from "next";
import { Suspense } from "react";
import QuoteFormLoading from "@/app/admin/quotes/_components/QuoteFormLoading";

export const metadata: Metadata = {
  title: "Admin - Create Quote",
};

const AdminCreateQuitePage = () => (
  <div className="py-14 max-w-xl mx-auto">
    <div className="mb-8">
      <Button href="/admin/quotes">Back to list</Button>
    </div>

    <Suspense
      fallback={
        <QuoteFormLoading
          title="Create Quote"
          cancelButtonText="Reset"
          submitButtonText="Submit"
        />
      }
    >
      <CreateQuoteWrapper />
    </Suspense>
  </div>
);

export default AdminCreateQuitePage;
