"use client";

import Image from "next/image";
import {AlertDialog, Button, CardFooter, CardRoot, Pagination} from "@/components";
import {FaPencilAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {Fragment, Suspense, useCallback, useEffect, useState} from "react";
import {DaydreamAPIDataStructure, getAllDaydreams} from "@/api/DaydreamAPI";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";
import {useOpenable} from "@/hooks";
import DaydreamService from "@/services/DaydreamService";
import toast from "react-hot-toast";
import DaydreamRowLoading from "@/app/admin/daydreams/_components/Loading/DaydreamRowLoading";
import {useRouter, useSearchParams} from "next/navigation";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";

const DaydreamTable = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const {isOpen, onClose, onOpen} = useOpenable();
    const {setParam, getUrl} = useSetParamsRouter();

    const [dreams, setDreams] = useState<DaydreamAPIDataStructure[]>([]);
    const [isGetAPILoading, setIsGetAPILoading] = useState<boolean>(true);
    const [isDeleteAPILoading, setIsDeleteAPILoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<DaydreamAPIDataStructure | null>(null);
    const [pagination, setPagination] = useState<PaginationProps>({
        ...DEFAULT_PAGINATION_VALUES,
        per_page: Number(searchParams.get("per_page")) || DEFAULT_PAGINATION_VALUES.per_page,
        current_page: Number(searchParams.get("page")) || DEFAULT_PAGINATION_VALUES.current_page,
    });

    const fetchData = useCallback(async () => {
        setIsGetAPILoading(true);

        const {data, pagination} = await getAllDaydreams({
            page: Number(searchParams.get("page")) || DEFAULT_PAGINATION_VALUES.current_page,
            per_page: Number(searchParams.get("per_page")) || DEFAULT_PAGINATION_VALUES.per_page,
        })

        if (pagination) setPagination(pagination);

        setDreams(data);
        setIsGetAPILoading(false);
    }, [searchParams])

    useEffect(() => {
        const controller = new AbortController();

        fetchData().catch(error => console.log(error));

        return () => controller.abort()
    }, [fetchData]);

    const onSelectHandler = (item: DaydreamAPIDataStructure) => {
        setSelected(item)
        onOpen()
    }

    const onDeleteHandler = async () => {
        setIsDeleteAPILoading(true);
        const id = crypto.randomUUID();

        await toast.promise(DaydreamService.delete({
            item: selected as DaydreamAPIDataStructure,
            toasterId: id
        }), {
            loading: `Updating your dream...`,
            success: "Your data has been successfully updated!",
            error: "I'm sorry, something went wrong"
        }, {id});

        setIsDeleteAPILoading(false);
        setSelected(null)

        if (dreams.length === 1) {
            if (pagination.current_page === 1) {
                setDreams([])
            } else {
                setPagination(prevState => ({
                    ...prevState,
                    current_page: prevState.current_page - 1
                }))
            }
        } else fetchData().catch(error => console.log(error));

        onClose();
    }

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
                    {isGetAPILoading ? [...Array(2)].map((_, index) => (
                        <DaydreamRowLoading key={`loading-row-${index}`}/>
                    )) : dreams.length ? dreams.map(item => (
                        <Suspense key={`dream-${item.id}`} fallback={<DaydreamRowLoading/>}>
                            <tr>
                                <td className="text-center">
                                    <div className="relative block aspect-square w-32 h-32 overflow-hidden">
                                        <Image
                                            src={getStoragePublicUrl(item.file.storage_file_path)}
                                            alt="Something"
                                            className="object-cover object-center point-events-none"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            quality={75}
                                            fill
                                        />
                                    </div>
                                </td>
                                <td>{item.year}</td>
                                <td>{item.description}</td>
                                <td>
                                    <span className="block mb-1 whitespace-nowrap">{item.iso} ISO</span>
                                    <span className="block mb-1 whitespace-nowrap">
                                        {item.shutter_speed} <abbr title="Shutter Speed">SS</abbr>
                                    </span>
                                    <span className="block mb-1 whitespace-nowrap">{item.aperture} Aperture</span>
                                </td>
                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex flex-row gap-1.5 justify-center">
                                        <Button
                                            icon
                                            rounded
                                            size="small"
                                            data-tooltip-id="admin-tooltip"
                                            data-tooltip-content="Edit"
                                            href={`/admin/daydreams/${item.id}`}
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
                        </Suspense>
                    )) : (
                        <tr>
                            <td colSpan={6} className="text-center">No result</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <CardFooter>
                    <Pagination
                        pagination={pagination}
                        onPageChange={(value) => {
                            setParam("page", value);
                            router.push(getUrl());
                        }}
                        onPerPageChange={(value) => {
                            setParam("per_page", value);
                            router.push(getUrl());
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
                    isLoading={isDeleteAPILoading}
                >
                    Are you sure you want to delete this customer record? This action cannot be undone.
                </AlertDialog>
            )}
        </Fragment>
    )
}


export default DaydreamTable;
