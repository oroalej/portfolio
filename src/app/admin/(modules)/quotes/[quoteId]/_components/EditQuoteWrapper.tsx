"use client";

import QuoteForm, {
  QuoteFormStructure,
} from "@/app/admin/(modules)/quotes/_components/QuoteForm";
import { omit } from "lodash";
import { Fragment, Suspense, useCallback } from "react";
import { AlertDialog } from "@/components";
import { useOpenable } from "@/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useDeleteQuoteMutation,
  useGetQuote,
  useUpdateQuoteMutation,
} from "@/features/quotes/api";
import AdminQuoteEditLoading from "@/app/admin/(modules)/quotes/[quoteId]/loading";
import toast from "react-hot-toast";

const EditQuoteWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuoteMutation = useUpdateQuoteMutation();
  const deleteQuoteMutation = useDeleteQuoteMutation();

  const { quoteId } = useParams();
  const { isOpen, onClose, onOpen } = useOpenable();
  const { isLoading: isFetchingLoading, data } = useGetQuote(quoteId as string);

  const onSubmitHandler = useCallback(
    async (value: QuoteFormStructure) => {
      await toast.promise(
        updateQuoteMutation.mutateAsync({
          id: quoteId as string,
          formData: value,
        }),
        {
          success: "Your data has been successfully updated!",
          loading: "Updating quote...",
          error: (error) => error,
        },
        {
          id: quoteId as string,
        }
      );
    },
    [quoteId]
  );

  const onDeleteHandler = useCallback(async () => {
    await toast.promise(
      deleteQuoteMutation.mutateAsync(quoteId as string),
      {
        success: "Your data has been successfully deleted!",
        loading: "Deleting quote...",
        error: (error) => error,
      },
      {
        id: quoteId as string,
      }
    );

    router.push(`/admin/quotes?${searchParams.toString()}`);
  }, [quoteId]);

  if (isFetchingLoading) {
    return <AdminQuoteEditLoading />;
  }

  return (
    <Fragment>
      <Suspense fallback={<AdminQuoteEditLoading />}>
        <QuoteForm
          onSubmit={onSubmitHandler}
          onDelete={onOpen}
          item={{
            ...omit(data, ["id"]),
          }}
          title="Edit Quote"
          cancelButtonText="Reset"
          submitButtonText="Update"
        />
      </Suspense>

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
