import {Button} from "@/components";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

export interface SimplePaginationProps {
    onChange: (value: number) => void;
    current_page: number;
    last_page: number;
    isLoading?: boolean
}

export const SimplePagination = (props: SimplePaginationProps) => {
    const {onChange, current_page, last_page, isLoading = false} = props;

    return (
        <div className="flex flex-row gap-1.5">
            <Button
                icon
                disabled={current_page === 1 || isLoading}
                onClick={() => onChange(current_page - 1)}
            >
                <FaChevronLeft/>
            </Button>

            <Button
                icon
                disabled={current_page === last_page || isLoading}
                onClick={() => onChange(current_page + 1)}
            >
                <FaChevronRight/>
            </Button>
        </div>
    )
}

