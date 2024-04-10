"use client";

import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useQueryState } from "next-usequerystate";
import {
  DataManagementTableRow,
  DataManagementTableRowLoading,
} from "@/app/admin/(modules)/data-management/_components/DataManagementTableRow";
import { CardBody, CardRoot } from "@/components";
import { useParams } from "next/navigation";

export const DataManagementTable = () => {
  const [term] = useQueryState("type", {
    shallow: false,
    defaultValue: "",
  });

  const { data, isLoading } = useGetTaxonomyByTermId({
    filter: { term_id: term },
  });

  if (!term) {
    return (
      <CardRoot className="grow flex-1 !bg-red-200" rounded>
        <CardBody>
          <p className="text-red-800 font-medium">Please select a type.</p>
        </CardBody>
      </CardRoot>
    );
  }

  return (
    <CardRoot className="grow flex-1" rounded>
      <table className="border-b border-neutral-200">
        <thead>
          <tr>
            <th className="w-72">Name</th>
            <th className="w-auto">Description</th>
            {/*<th className="w-56">Parent</th>*/}
            <th className="w-28" />
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            [...Array(2)].map((_, index) => (
              <DataManagementTableRowLoading
                key={`data-management-loading-${index}`}
              />
            ))
          ) : !!data?.length ? (
            data.map((item) => (
              <DataManagementTableRow
                key={`data-management-${item.id}`}
                item={item}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No Result
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </CardRoot>
  );
};
