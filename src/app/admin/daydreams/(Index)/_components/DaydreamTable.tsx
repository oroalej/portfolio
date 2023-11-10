"use client";

import { AlertDialog, CardFooter, CardRoot, Pagination } from "@/components";
import { Fragment, Suspense, useCallback, useState } from "react";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { useOpenable } from "@/hooks";
import { useSearchParams } from "next/navigation";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";
import {
  useDeleteDaydreamMutation,
  useGetDaydreamList,
} from "@/features/daydreams/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  DaydreamTableRow,
  DaydreamTableRowLoading,
} from "@/app/admin/daydreams/(Index)/_components/DaydreamTableRow";

const DaydreamTable = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen } = useOpenable();
  const { setParam, getParams, push } = useSetParamsRouter();

  const [selected, setSelected] = useState<DaydreamAPIDataStructure | null>(
    null
  );

  const deleteDaydreamMutation = useDeleteDaydreamMutation();
  const { isLoading: isGetAPILoading, data } = useGetDaydreamList({
    page:
      Number(searchParams.get("page")) ||
      DEFAULT_PAGINATION_VALUES.current_page,
    per_page:
      Number(searchParams.get("per_page")) ||
      DEFAULT_PAGINATION_VALUES.per_page,
    sort: [{ column: "created_at", order: "desc" }],
  });

  const onSelectHandler = useCallback((item: DaydreamAPIDataStructure) => {
    setSelected(item);
    onOpen();
  }, []);

  const onDeleteHandler = useCallback(async () => {
    if (!selected) return;

    await deleteDaydreamMutation.mutateAsync(selected);

    if (data?.data.length === 1) {
      setParam(
        "page",
        (Number(data?.pagination?.per_page) - 1 ?? 1).toString()
      );
      push();
    } else {
      await queryClient.refetchQueries({
        queryKey: ["daydreams"],
        type: "active",
      });
    }

    setSelected(null);
    onClose();
  }, [selected?.id]);

  return (
    <Fragment>
      <CardRoot>
        <table className="border-b border-neutral-200">
          <thead>
            <tr>
              <th className="w-32">Image</th>
              <th className="w-36">Year</th>
              <th>Description</th>
              <th className="w-40">Setting</th>
              <th className="w-48">Created At</th>
              <th className="w-28"></th>
            </tr>
          </thead>
          <tbody>
            {isGetAPILoading ? (
              [...Array(2)].map((_, index) => (
                <DaydreamTableRowLoading key={`loading-row-${index}`} />
              ))
            ) : data?.data.length ? (
              data.data.map((item) => (
                <Suspense
                  key={`dream-${item.id}`}
                  fallback={<DaydreamTableRowLoading />}
                >
                  <DaydreamTableRow item={item} onClick={onSelectHandler} />
                </Suspense>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No result
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <CardFooter>
          <Pagination
            pagination={data?.pagination || DEFAULT_PAGINATION_VALUES}
            onPageChange={(value) => {
              setParam("page", value);
              push();
            }}
            onPerPageChange={(value) => {
              setParam("per_page", value);
              push();
            }}
          />
        </CardFooter>
      </CardRoot>

      {selected && (
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onDeleteHandler}
          confirmButtonText="Yes, delete dream"
          confirmButtonColor="danger"
          title={`Delete ${selected.description}`}
          isLoading={deleteDaydreamMutation.isPending}
        >
          Are you sure you want to delete this customer record? This action
          cannot be undone.
        </AlertDialog>
      )}
    </Fragment>
  );
};

export default DaydreamTable;
