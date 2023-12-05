"use client";

import QuoteForm, {
  QuoteFormStructure,
} from "@/app/admin/quotes/_components/QuoteForm";
import { Suspense, useCallback } from "react";
import { useStoreQuoteMutation } from "@/features/quotes/api";
import toast from "react-hot-toast";
import QuoteFormLoading from "@/app/admin/quotes/_components/Loading/QuoteFormLoading";

const CreateQuoteWrapper = () => {
  const storeQuoteMutation = useStoreQuoteMutation();

  const onSubmitHandler = useCallback(async (value: QuoteFormStructure) => {
    await toast.promise(storeQuoteMutation.mutateAsync(value), {
      success: "Your data has been successfully created!",
      loading: "Creating your quote...",
      error: (error) => error,
    });
  }, []);

  return (
    <Suspense
      fallback={
        <QuoteFormLoading title="Create Quote" submitButtonText="Create" />
      }
    >
      <QuoteForm
        onSubmit={onSubmitHandler}
        title="Create Quote"
        submitButtonText="Create"
      />
    </Suspense>
  );
};

export default CreateQuoteWrapper;
