"use client";

import QuoteForm, {
  QuoteFormStructure,
} from "@/app/admin/quotes/_components/QuoteForm";
import { any, object } from "zod";
import { omit } from "lodash";
import { Fragment, useCallback } from "react";
import { AlertDialog } from "@/components";
import { useOpenable } from "@/hooks";
import { useParams, useRouter } from "next/navigation";
import QuoteFormLoading from "@/app/admin/quotes/_components/QuoteFormLoading";
import {
  useDeleteQuoteMutation,
  useGetQuote,
  useUpdateQuoteMutation,
} from "@/features/quotes/api";

const EditQuoteSchema = object({
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

const EditQuoteWrapper = () => {
  const router = useRouter();
  const { quoteId } = useParams();
  const { isOpen, onClose, onOpen } = useOpenable();

  const { isLoading: isFetchingLoading, data } = useGetQuote(quoteId as string);
  const updateQuoteMutation = useUpdateQuoteMutation();
  const deleteQuoteMutation = useDeleteQuoteMutation();

  const onSubmitHandler = useCallback(
    async (value: QuoteFormStructure) =>
      updateQuoteMutation.mutate({
        id: quoteId as string,
        formData: value,
      }),
    [quoteId]
  );

  const onDeleteHandler = useCallback(async () => {
    await deleteQuoteMutation.mutate(quoteId as string);

    router.push("/admin/quotes");
  }, [quoteId]);

  if (isFetchingLoading) {
    return (
      <QuoteFormLoading
        cancelButtonText="Reset"
        submitButtonText="Update"
        title="Edit Quote"
      />
    );
  }

  return (
    <Fragment>
      <QuoteForm
        onSubmit={onSubmitHandler}
        onDelete={onOpen}
        schema={EditQuoteSchema}
        title="Edit Quote"
        item={{
          ...omit(data, "id"),
        }}
        cancelButtonText="Reset"
        submitButtonText="Update"
      />

      {isOpen && (
        <AlertDialog
          onConfirm={onDeleteHandler}
          isOpen={isOpen}
          onClose={onClose}
          confirmButtonText="Yes, delete"
          confirmButtonColor="danger"
          title="Delete Quote"
          isLoading={deleteQuoteMutation.isPending}
        >
          Are you sure you want to delete this quote? This action cannot be
          undone.
        </AlertDialog>
      )}
    </Fragment>
  );
};

export default EditQuoteWrapper;
