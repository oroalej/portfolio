import {Button, ButtonProps} from "@/components";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {PropType} from "@/types";

export interface SimplePaginationProps {
    onChange: (value: number) => void;
    current_page: number;
    last_page: number;
    isLoading?: boolean
    size?: PropType<ButtonProps, "size">
}

export const SimplePagination = (props: SimplePaginationProps) => {
    const {onChange, current_page, last_page, isLoading = false, size = "default"} = props;

    return (
        <div className="flex flex-row gap-2.5">
            <Button
                icon
                rounded
                size={size}
                disabled={current_page === 1 || isLoading}
                onClick={() => onChange(current_page - 1)}
            >
                <FaChevronLeft/>
            </Button>

            <Button
                icon
                rounded
                size={size}
                disabled={current_page === last_page || isLoading}
                onClick={() => onChange(current_page + 1)}
            >
                <FaChevronRight/>
            </Button>
        </div>
    )
}

