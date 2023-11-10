"use client";

import {
  AlertDialog,
  Button,
  CardFooter,
  CardRoot,
  Pagination,
} from "@/components";
import { Fragment, useCallback, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { useOpenable } from "@/hooks";
import RowLoading from "@/app/admin/quotes/(Index)/_components/RowLoading";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";
import { useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteQuoteMutation, useGetQuoteList } from "@/features/quotes/api";
import { GetAllQuotesAPIDataStructure } from "@/features/quotes/types";

const QuotesTable = () => {
  const searchParams = useSearchParams();
  const deleteQuoteMutation = useDeleteQuoteMutation();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen } = useOpenable();
  const { setParam, getParams, push } = useSetParamsRouter();

  const [selected, setSelected] = useState<GetAllQuotesAPIDataStructure | null>(
    null
  );

  const { isLoading: isGetAPILoading, data } = useGetQuoteList({
    page:
      Number(searchParams.get("page")) ||
      DEFAULT_PAGINATION_VALUES.current_page,
    per_page:
      Number(searchParams.get("per_page")) ||
      DEFAULT_PAGINATION_VALUES.per_page,
    filter: removeEmptyValues({
      category_id: searchParams.get("category_id"),
      source_id: searchParams.get("source_id"),
      media_detail_id: searchParams.get("media_detail_id"),
    }),
    sort: [{ column: "created_at", order: "desc" }],
  });

  const queryParams = getParams();

  const onSelectHandler = (item: GetAllQuotesAPIDataStructure) => {
    setSelected(item);
    onOpen();
  };

  const onDeleteHandler = useCallback(async () => {
    if (!selected) return;

    await deleteQuoteMutation.mutateAsync(selected.id);

    if (data?.data.length === 1) {
      setParam(
        "page",
        (Number(data?.pagination?.per_page) - 1 ?? 1).toString()
      );
      push();
    } else {
      await queryClient.refetchQueries({
        queryKey: ["quotes"],
        type: "active",
      });
    }

    setSelected(null);
    onClose();
  }, [selected?.id, queryParams]);

  return (
    <Fragment>
      <CardRoot className="grow">
        <table className="border-b border-neutral-200">
          <thead>
            <tr>
              <th className="w-28">Category</th>
              <th className="">Quote</th>
              <th className="w-56">Source</th>
              <th className="w-56">Media Detail</th>
              <th className="w-28"></th>
            </tr>
          </thead>
          <tbody>
            {isGetAPILoading ? (
              [...Array(2)].map((_, index) => (
                <RowLoading key={`row-loading-${index}`} />
              ))
            ) : data?.data.length ? (
              data.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.category.name}</td>
                  <td>{item.content}</td>
                  <td>{item.media_detail?.name || "-"}</td>
                  <td>{item.source?.name || "-"}</td>
                  <td>
                    <div className="flex flex-row gap-1.5 justify-center">
                      <Button
                        icon
                        rounded
                        size="small"
                        data-tooltip-id="admin-tooltip"
                        data-tooltip-content="Edit"
                        href={`/admin/quotes/${item.id}`}
                      >
                        <FaPencilAlt />
                      </Button>

                      <Button
                        icon
                        rounded
                        size="small"
                        data-tooltip-id="admin-tooltip"
                        data-tooltip-content="Delete"
                        onClick={() => onSelectHandler(item)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
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
            onPageChange={(value) => {
              setParam("page", value.toString());
              push();
            }}
            onPerPageChange={(value) => {
              setParam("per_page", value.toString());
              push();
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
