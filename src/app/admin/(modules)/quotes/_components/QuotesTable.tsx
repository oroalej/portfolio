"use client";

import { AlertDialog, CardFooter, CardRoot, Pagination } from "@/components";
import { Fragment, Suspense, useCallback, useState } from "react";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { useOpenable } from "@/hooks";
import { useParams, useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/utils";
import { useDeleteQuoteMutation, useGetQuoteList } from "@/features/quotes/api";
import { useQueryState } from "next-usequerystate";
import { GetAllQuotesAPIDataStructure } from "@/features/quotes/types";
import QuoteTableLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteTableLoading";
import QuoteTableRow from "@/app/admin/(modules)/quotes/_components/QuoteTableRow";
import toast from "react-hot-toast";
import QuoteTableRowLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteTableRowLoading";

const QuotesTable = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const deleteQuoteMutation = useDeleteQuoteMutation();

  const { isOpen, onClose, onOpen } = useOpenable();

  const [perPage, setPerPage] = useQueryState("per_page", { shallow: false });
  const [page, setPage] = useQueryState("page", { shallow: false });

  const [selected, setSelected] = useState<GetAllQuotesAPIDataStructure | null>(
    null
  );

  const { isLoading: isGetAPILoading, data } = useGetQuoteList({
    q: searchParams.get("q") || undefined,
    page: Number(page) || DEFAULT_PAGINATION_VALUES.current_page,
    per_page: Number(perPage) || DEFAULT_PAGINATION_VALUES.per_page,
    filter: removeEmptyValues({
      category_id: searchParams.get("category_id"),
      source_id: searchParams.get("source_id"),
      media_detail_id: searchParams.get("media_detail_id"),
    }),
    sort: [{ column: "created_at", order: "desc" }],
  });

  const onSelectHandler = useCallback((item: GetAllQuotesAPIDataStructure) => {
    setSelected(item);
    onOpen();
  }, []);

  const onDeleteHandler = useCallback(async () => {
    if (!selected) return;

    await toast.promise(
      deleteQuoteMutation.mutateAsync(selected.id),
      {
        success: "Your data has been successfully deleted!",
        loading: "Deleting quote...",
        error: (error) => error,
      },
      {
        id: selected.id,
      }
    );

    setSelected(null);
    onClose();
  }, [selected?.id]);

  if (isGetAPILoading) {
    return <QuoteTableLoading />;
  }

  return (
    <Fragment>
      <CardRoot className="grow flex-1 transition-all" rounded>
        <table className="border-b border-neutral-200">
          <thead>
            <tr>
              <th className="w-28">Category</th>
              <th>Content</th>
              <th className="w-56">Source</th>
              <th className="w-56">Media Detail</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.length ? (
              data.data.map((item) => (
                <Suspense key={item.id} fallback={<QuoteTableRowLoading />}>
                  <QuoteTableRow
                    item={item}
                    onSelect={onSelectHandler}
                    isSelected={params?.quoteId === item.id}
                  />
                </Suspense>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={5}>
                  No Result...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <CardFooter>
          <Pagination
            pagination={data?.pagination || DEFAULT_PAGINATION_VALUES}
            onPageChange={async (value) => {
              await setPage(String(value));
            }}
            onPerPageChange={async (value) => {
              await setPerPage(String(value));
            }}
          />
        </CardFooter>
      </CardRoot>

      {selected && (
        <AlertDialog
          onConfirm={onDeleteHandler}
          isOpen={isOpen}
          onClose={onClose}
          confirmButtonText="Yes, delete quote"
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

export default QuotesTable;
