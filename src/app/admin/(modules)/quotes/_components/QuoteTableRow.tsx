"use client";

import { Button } from "@/components";
import { FaPencilAlt } from "react-icons/fa";
import { FaChevronRight, FaTrash } from "react-icons/fa6";
import { GetAllQuotesAPIDataStructure } from "@/features/quotes/types";
import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

interface QuoteTableRow {
  item: GetAllQuotesAPIDataStructure;
  isSelected: boolean;
  onSelect: (value: GetAllQuotesAPIDataStructure) => void;
}

const QuoteTableRow = ({ item, isSelected, onSelect }: QuoteTableRow) => {
  const searchParams = useSearchParams();

  return (
    <tr
      key={item.id}
      className={classNames({
        "bg-neutral-100": isSelected,
      })}
    >
      <td>{item.category.name}</td>
      <td>{item.content}</td>
      <td>{item?.media_detail?.name || "-"}</td>
      <td>{item?.source?.name || "-"}</td>
      <td>
        <div className="flex flex-row gap-1.5 justify-end">
          {isSelected ? (
            <div className="inline-flex items-center gap-1 font-medium bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md h-[38px] transition-colors">
              <span className="text-sm">Selected</span>
              <FaChevronRight />
            </div>
          ) : (
            <Fragment>
              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Edit"
                href={`/admin/quotes/${item.id}?${searchParams.toString()}`}
              >
                <FaPencilAlt />
              </Button>

              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Delete"
                onClick={() => onSelect(item)}
              >
                <FaTrash />
              </Button>
            </Fragment>
          )}
        </div>
      </td>
    </tr>
  );
};

export default QuoteTableRow;
