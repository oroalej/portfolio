"use client";

import {AlertDialog, Button, CardFooter, CardRoot, Pagination} from "@/components";
import {Fragment, useCallback, useEffect, useState} from "react";
import {FaPencilAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";
import {useOpenable} from "@/hooks";
import toast from "react-hot-toast";
import {deleteQuote, getAllQuotes, GetAllQuotesAPIDataStructure} from "@/api/QuoteAPI";
import RowLoading from "@/app/admin/quotes/_components/RowLoading";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {removeEmptyValues} from "@/utils";

const QuotesTable = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const {isOpen, onClose, onOpen} = useOpenable();
    const [list, setList] = useState<GetAllQuotesAPIDataStructure[]>([]);
    const [isGetAPILoading, setIsGetAPILoading] = useState<boolean>(true);
    const [isDeleteAPILoading, setIsDeleteAPILoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<GetAllQuotesAPIDataStructure | null>(null);
    const [pagination, setPagination] = useState<PaginationProps>({
        ...DEFAULT_PAGINATION_VALUES,
        per_page: Number(searchParams.get("per_page")) || DEFAULT_PAGINATION_VALUES.per_page,
        current_page: Number(searchParams.get("page")) || DEFAULT_PAGINATION_VALUES.current_page,
    });

    const fetchData = useCallback(async () => {
        setIsGetAPILoading(true);

        const data = await getAllQuotes({
            page: Number(searchParams.get("page")) || DEFAULT_PAGINATION_VALUES.current_page,
            per_page: Number(searchParams.get("per_page")) || DEFAULT_PAGINATION_VALUES.per_page,
            filter: removeEmptyValues({
                category_id: searchParams.get("category_id"),
                source_id: searchParams.get("source_id"),
                media_detail_id: searchParams.get("media_detail_id")
            })
        });

        if (data.pagination) setPagination(data.pagination);

        setList(data.data);
        setIsGetAPILoading(false);
    }, [searchParams]);

    useEffect(() => {
        fetchData().catch(error => console.log(error));
    }, [fetchData]);

    const onSelectHandler = (item: GetAllQuotesAPIDataStructure) => {
        setSelected(item)
        onOpen()
    }

    const onDeleteHandler = async () => {
        if (!selected) return;

        setIsDeleteAPILoading(true);
        const id = crypto.randomUUID();

        await toast.promise(deleteQuote(selected.id), {
            loading: `Deleting ${selected.id} dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        setIsDeleteAPILoading(false);
        setSelected(null)

        if (list.length === 1) {
            if (pagination.current_page === 1) {
                setList([])
            } else {
                setPagination(prevState => ({
                    ...prevState,
                    current_page: prevState.current_page - 1
                }))
            }
        } else {
            fetchData().catch(error => console.log(error))
        }

        onClose();
    }

    const setUrlParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);

        router.push(`${pathname}?${params.toString()}`);
    }

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
                    {isGetAPILoading ? [...Array(2)].map((_, index) => (
                        <RowLoading key={`row-loading-${index}`}/>
                    )) : list.length ? list.map(item => (
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
                                        <FaPencilAlt/>
                                    </Button>

                                    <Button
                                        icon
                                        rounded
                                        size="small"
                                        data-tooltip-id="admin-tooltip"
                                        data-tooltip-content="Delete"
                                        onClick={() => onSelectHandler(item)}
                                    >
                                        <FaTrash/>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )) : (
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
                        pagination={pagination}
                        onPageChange={(value) => setUrlParam("page", value.toString())}
                        onPerPageChange={(value) => setUrlParam("per_page", value.toString())}
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
                    isLoading={isDeleteAPILoading}
                >
                    Are you sure you want to delete this quote? This action cannot be undone.
                </AlertDialog>
            )}
        </Fragment>
    )
}

export default QuotesTable;
