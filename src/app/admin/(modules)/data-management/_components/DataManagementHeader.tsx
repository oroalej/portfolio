"use client";

import {
  Button,
  CardHeader,
  CardRoot,
  CardTitle,
  SingleSimpleSelect,
} from "@/components";
import { TermAPIDataStructure } from "@/features/terms/types";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { useQueryState } from "next-usequerystate";
import { useMemo } from "react";
import { BsDatabaseFill } from "react-icons/bs";

export const DataManagementHeader = () => {
  const { data } = useGetTermList();

  const [term, setTerm] = useQueryState("type", {
    shallow: false,
    defaultValue: "",
  });

  const selectedTypeText = useMemo(() => {
    if (term && !!data?.length) {
      return data.find((item) => item.id === term)?.name || "Taxonomy";
    }

    return "Taxonomy";
  }, [term, data]);

  return (
    <CardRoot className="grow flex-1 transition-all mb-4" rounded>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle icon={<BsDatabaseFill />}>
            Data Management - {selectedTypeText}
          </CardTitle>

          <div className="flex flex-row gap-3 items-center justify-end">
            <div className="w-56">
              <SingleSimpleSelect<string, TermAPIDataStructure>
                optionValue="id"
                optionText="name"
                options={data ?? []}
                onChange={(value) => {
                  setTerm(value).catch();
                }}
                value={term}
                placeholder="Select type"
              />
            </div>

            <Button
              rounded
              size="small"
              href={`/admin/data-management?type=${term}`}
            >
              Add {selectedTypeText}
            </Button>
          </div>
        </div>
      </CardHeader>
    </CardRoot>
  );
};
