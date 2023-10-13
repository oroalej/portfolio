"use client";

import Image from "next/image";
import {
    AlertDialog,
    BaseSkeletonLoader,
    Button,
    CardFooter,
    CardRoot,
    ImageSkeletonLoader,
    SimplePagination,
    SingleSimpleSelect
} from "@/components";
import {FaPencilAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {Fragment, useEffect, useState} from "react";
import {DaydreamAPIDataStructure, getAllDaydreams} from "@/api/DaydreamAPI";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";
import {SelectDataFormatter} from "@/utils";
import {useOpenable} from "@/hooks";
import DaydreamService from "@/services/DaydreamService";
import toast from "react-hot-toast";

const DaydreamTable = () => {
    const storagePublicUrl = getStoragePublicUrl("")

    const [dreams, setDreams] = useState<DaydreamAPIDataStructure[]>([]);
    const [pagination, setPagination] = useState<PaginationProps>(DEFAULT_PAGINATION_VALUES);
    const [isGetAPILoading, setIsGetAPILoading] = useState<boolean>(true);
    const [isDeleteAPILoading, setIsDeleteAPILoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<DaydreamAPIDataStructure | null>(null);
    const {isOpen, onClose, onOpen} = useOpenable();

    useEffect(() => {
        const controller = new AbortController();

        fetchData();

        return () => controller.abort()
    }, [pagination.current_page, pagination.per_page]);

    const fetchData = () => {
        getAllDaydreams({
            page: pagination.current_page,
            per_page: pagination.per_page,
        }).then(({data, pagination}) => {
            setDreams(data)

            if (pagination) setPagination(pagination)

            setIsGetAPILoading(false);
        })
    }

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
        } else fetchData();

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
                        <tr key={`loading-row-${index}`}>
                            <td><ImageSkeletonLoader/></td>
                            <td><BaseSkeletonLoader/></td>
                            <td><BaseSkeletonLoader/></td>
                            <td>
                                <BaseSkeletonLoader className="mb-1.5"/>
                                <BaseSkeletonLoader className="mb-1.5"/>
                                <BaseSkeletonLoader className="mb-1.5"/>
                            </td>
                            <td><BaseSkeletonLoader/></td>
                            <td></td>
                        </tr>
                    )) : dreams.length ? dreams.map(item => (
                        <tr key={`dream-${item.id}`}>
                            <td className="text-center">
                                <div className="relative block aspect-square w-32 h-32 overflow-hidden">
                                    <Image
                                        src={`${storagePublicUrl}${item.file.storage_file_path}`}
                                        alt="Something"
                                        className="object-cover object-center point-events-none"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        quality={75}
                                        fill
                                        placeholder="blur"
                                        blurDataURL={`${storagePublicUrl}${item.file.storage_file_path}`}
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
                                        data-tooltip-id="admin-tooltip"
                                        data-tooltip-content="Edit"
                                        href={`/admin/daydreams/${item.id}`}
                                    >
                                        <FaPencilAlt/>
                                    </Button>

                                    <Button
                                        icon
                                        rounded
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
                            <td colSpan={6} className="text-center">No result</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <CardFooter className="justify-between">
                    <div className="flex flex-row items-center gap-2 text-sm">
                        <span>Items: </span>
                        <SingleSimpleSelect<number>
                            options={SelectDataFormatter([15, 25, 50, 100])}
                            onChange={(value) => setPagination((prevState) => ({
                                ...prevState,
                                per_page: value
                            }))}
                            value={pagination.per_page}
                        />
                    </div>

                    <div className="flex flex-row gap-6 items-center">
                        <span className="text-neutral-600">
                            {pagination.from}-{pagination.to} of {pagination.total}
                        </span>

                        <SimplePagination
                            current_page={pagination.current_page}
                            last_page={pagination.last_page}
                            onChange={(value) => setPagination(prevState => ({
                                ...prevState,
                                current_page: value
                            }))}
                            isLoading={isGetAPILoading}
                        />
                    </div>
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
