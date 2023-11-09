"use client";

import { any, object } from "zod";
import QuoteForm, {
  QuoteFormStructure,
} from "@/app/admin/quotes/_components/QuoteForm";
import { useOpenable } from "@/hooks";
import { Fragment, useCallback } from "react";
import { AlertDialog } from "@/components";
import { useRouter } from "next/navigation";
import { useStoreQuoteMutation } from "@/features/quotes/api";

export const CreateQuoteSchema = object({
  content: any().refine(
    (data) => data.length !== 0,
    "The content field is required"
  ),
  category_id: any().refine(
    (data) => data !== null,
    "The category field is required"
  ),
  source_id: any().refine(
    (data) => data !== null,
    "The source field is required"
  ),
  media_detail_id: any().refine(
    (data) => data !== null,
    "The media detail field is required"
  ),
});

const CreateQuoteWrapper = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useOpenable();
  const storeQuoteMutation = useStoreQuoteMutation();

  const onSubmitHandler = useCallback(async (value: QuoteFormStructure) => {
    await storeQuoteMutation.mutateAsync(value);

    onOpen();
  }, []);

  const onAlertCancelHandler = () => {
    if (!!storeQuoteMutation.data?.id) {
      router.push(`/admin/quotes/${storeQuoteMutation.data!.id}`);
    }
  };

  return (
    <Fragment>
      <QuoteForm
        onSubmit={onSubmitHandler}
        schema={CreateQuoteSchema}
        title="Create Quote"
      />

      {storeQuoteMutation.data && (
        <AlertDialog
          title="Do you want to create another quote?"
          cancelButtonText="No"
          isOpen={isOpen}
          onConfirm={onClose}
          onClose={onAlertCancelHandler}
        />
      )}
    </Fragment>
  );
};

export default CreateQuoteWrapper;
