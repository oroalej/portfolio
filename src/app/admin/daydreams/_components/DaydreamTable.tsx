"use client";

import { AlertDialog, CardFooter, CardRoot, Pagination } from "@/components";
import { useOpenable } from "@/hooks";
import { useParams, useSearchParams } from "next/navigation";
import {
  useDeleteDaydreamMutation,
  useGetDaydreamList,
} from "@/features/daydreams/api";
import {
  DaydreamTableRow,
  DaydreamTableRowLoading,
} from "@/app/admin/daydreams/_components/DaydreamTableRow";
import { useQueryClient } from "@tanstack/react-query";
import { removeEmptyValues } from "@/utils";
import { useQueryState } from "next-usequerystate";
import { Fragment, Suspense, useCallback, useState } from "react";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import DaydreamTableLoading from "@/app/admin/daydreams/_components/Loading/DaydreamTableLoading";
import toast from "react-hot-toast";

const DaydreamTable = () => {
  const { daydreamId } = useParams();
  const searchParams = useSearchParams();

  const deleteDaydreamMutation = useDeleteDaydreamMutation();
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen } = useOpenable();

  const [perPage, setPerPage] = useQueryState("per_page", {
    parse: parseInt,
    shallow: false,
  });

  const [page, setPage] = useQueryState("page", {
    parse: parseInt,
    shallow: false,
  });

  const [selected, setSelected] = useState<DaydreamAPIDataStructure | null>(
    null
  );

  const { isLoading: isGetAPILoading, data } = useGetDaydreamList({
    q: searchParams.get("q") ?? undefined,
    page: page || DEFAULT_PAGINATION_VALUES.current_page,
    per_page: perPage || DEFAULT_PAGINATION_VALUES.per_page,
    filter: removeEmptyValues({
      year: searchParams.get("year"),
    }),
    sort: [{ column: "created_at", order: "desc" }],
  });

  const onSelectHandler = useCallback((item: DaydreamAPIDataStructure) => {
    setSelected(item);
    onOpen();
  }, []);

  const onDeleteHandler = useCallback(async () => {
    if (!selected) return;

    await toast.promise(deleteDaydreamMutation.mutateAsync(selected.id), {
      success: "Your data has been successfully deleted!",
      loading: "Deleting dream...",
      error: (error) => error,
    });

    if (data?.data.length === 1) {
      await setPage(data?.pagination?.per_page - 1 ?? 1);
    } else {
      await queryClient.invalidateQueries({
        queryKey: ["daydreams"],
        type: "active",
      });
    }

    setSelected(null);
    onClose();
  }, [selected?.id]);

  if (isGetAPILoading) {
    return <DaydreamTableLoading />;
  }

  return (
    <Fragment>
      <CardRoot rounded className="grow flex-1 transition-all">
        <table className="border-b border-neutral-200">
          <thead>
            <tr>
              <th className="w-32">Image</th>
              <th className="w-36">Year</th>
              <th>Description</th>
              <th className="w-40">Setting</th>
              <th className="w-48">Created At</th>
              <th className="w-32"></th>
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
                  <DaydreamTableRow
                    item={item}
                    onClick={onSelectHandler}
                    isSelected={item.id === daydreamId}
                  />
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
            onPageChange={async (value) => {
              await setPage(value);
            }}
            onPerPageChange={async (value) => {
              await setPerPage(value);
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
