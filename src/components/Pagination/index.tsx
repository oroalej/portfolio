import { Button, ButtonProps, SingleSimpleSelect } from "@/components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PropType } from "@/types";
import { SelectDataFormatter } from "@/utils";
import { DEFAULT_PAGINATION_VALUES, PaginationProps } from "@/utils/pagination";

export interface SimplePaginationProps {
  onChange: (value: number) => void;
  current_page: number;
  last_page: number;
  isLoading?: boolean;
  size?: PropType<ButtonProps, "size">;
}

export const SimplePagination = (props: SimplePaginationProps) => {
  const {
    onChange,
    current_page,
    last_page,
    isLoading = false,
    size = "default",
  } = props;

  return (
    <div className="flex flex-row gap-2.5">
      <Button
        icon
        rounded
        size={size}
        disabled={current_page === 1 || isLoading}
        onClick={() => onChange(current_page - 1)}
      >
        <FaChevronLeft />
      </Button>

      <Button
        icon
        rounded
        size={size}
        disabled={current_page === last_page || isLoading}
        onClick={() => onChange(current_page + 1)}
      >
        <FaChevronRight />
      </Button>
    </div>
  );
};

interface PaginationComponentProps {
  pagination: PaginationProps;
  onPageChange: (value: number) => void;
  onPerPageChange: (value: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  pagination,
  onPageChange,
  onPerPageChange,
  isLoading,
}: PaginationComponentProps) => (
  <div className="flex flex-row justify-between w-full">
    <div className="flex flex-row items-center gap-2 text-sm">
      <span>Items: </span>
      <SingleSimpleSelect<number>
        options={SelectDataFormatter([15, 20, 25, 50, 100])}
        onChange={onPerPageChange}
        value={pagination.per_page}
        defaultValue={DEFAULT_PAGINATION_VALUES.per_page}
      />
    </div>

    <div className="flex flex-row gap-6 items-center">
      <span className="text-neutral-600">
        {pagination.from}-{pagination.to} of {pagination.total}
      </span>

      <SimplePagination
        current_page={pagination.current_page}
        last_page={pagination.last_page}
        onChange={onPageChange}
        isLoading={isLoading}
        size="small"
      />
    </div>
  </div>
);
