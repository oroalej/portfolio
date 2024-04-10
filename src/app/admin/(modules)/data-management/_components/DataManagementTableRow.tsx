"use client";

import { AlertDialog, BaseSkeletonLoader, Button } from "@/components";
import { FaPencilAlt } from "react-icons/fa";
import { FaChevronRight, FaTrash } from "react-icons/fa6";
import { TaxonomyWithParentAPIDataStructure } from "@/features/term_taxonomy/types";
import { Fragment, useCallback, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import toast from "react-hot-toast";
import { useDeleteTaxonomyMutation } from "@/features/term_taxonomy/api/deleteTaxonomy";
import { pick } from "lodash";
import { useParams, useRouter } from "next/navigation";

export interface DataManagementTableRowProps {
  item: TaxonomyWithParentAPIDataStructure;
}

export const DataManagementTableRow = ({
  item,
}: DataManagementTableRowProps) => {
  const deleteTaxonomyMutation = useDeleteTaxonomyMutation();

  const params = useParams<{ taxonomyId?: string }>();
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isSelected = params?.taxonomyId === item.id;

  const onDeleteHandler = useCallback(async () => {
    setIsDeleteLoading(true);

    await toast.promise(
      deleteTaxonomyMutation.mutateAsync(pick(item, ["id", "term_id"])),
      {
        success: () => {
          setIsDeleteDialogOpen(false);
          setIsDeleteLoading(false);

          return "Data has been successfully deleted";
        },
        loading: "Deleting taxonomy...",
        error: (error) => {
          setIsDeleteLoading(false);

          return error;
        },
      }
    );

    router.push(`/admin/data-management?type=${item.term_id}`);
  }, []);

  return (
    <Fragment>
      <tr>
        <td>{item.name}</td>
        <td>{item.description ?? "-"}</td>
        <td>{item.parent?.name ?? "-"}</td>
        <td>
          {isSelected ? (
            <div className="inline-flex items-center gap-1 font-medium bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md h-[38px] transition-colors">
              <span className="text-sm">Selected</span>
              <FaChevronRight />
            </div>
          ) : (
            <div className="flex flex-row gap-1.5 justify-end">
              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Edit"
                href={`/admin/data-management/${item.id}?type=${item.term_id}`}
              >
                <FaPencilAlt />
              </Button>

              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Delete"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </td>
      </tr>

      {isDeleteDialogOpen && (
        <Portal.Root>
          <AlertDialog
            title={`Delete ${item.name}`}
            onConfirm={onDeleteHandler}
            isOpen={isDeleteDialogOpen}
            isLoading={isDeleteLoading}
            confirmButtonText="Delete Taxonomy"
            confirmButtonColor="danger"
            onClose={() => setIsDeleteDialogOpen(false)}
          >
            Are you sure you want to delete this?
          </AlertDialog>
        </Portal.Root>
      )}
    </Fragment>
  );
};

export const DataManagementTableRowLoading = () => (
  <tr>
    <td>
      <BaseSkeletonLoader
        className="w-1/2 rounded"
        style={{ height: "19px" }}
      />
    </td>
    <td>
      <BaseSkeletonLoader
        className="w-1/2 rounded"
        style={{ height: "19px" }}
      />
    </td>
    <td>
      <BaseSkeletonLoader
        className="w-1/2 rounded"
        style={{ height: "19px" }}
      />
    </td>
    <td>
      <div className="flex flex-row gap-1.5 justify-end">
        <BaseSkeletonLoader
          className="rounded"
          style={{ height: "38px", width: "38px" }}
        />

        <BaseSkeletonLoader
          className="rounded"
          style={{ height: "38px", width: "38px" }}
        />
      </div>
    </td>
  </tr>
);
