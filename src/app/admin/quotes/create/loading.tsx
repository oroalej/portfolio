import { Button } from "@/components";
import QuoteFormLoading from "@/app/admin/quotes/_components/QuoteFormLoading";

const AdminQuoteFormLoading = () => (
  <div className="py-14 max-w-xl mx-auto">
    <div className="mb-8">
      <Button disabled>Back to list</Button>
    </div>

    <QuoteFormLoading
      title="Edit Quote"
      cancelButtonText="Cancel"
      submitButtonText="Submit"
    />
  </div>
);

export default AdminQuoteFormLoading;
