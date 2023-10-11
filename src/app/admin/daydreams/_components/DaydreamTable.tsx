"use client";

import Image from "next/image";
import {Button, CardFooter, CardRoot, SimplePagination, SingleSimpleSelect} from "@/components";
import {FaPencilAlt} from "react-icons/fa";
import {FaTrash} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {getAllDaydreams} from "@/api/DaydreamAPI";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {Tables} from "@/types";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";
import {SelectDataFormatter} from "@/utils";

const DaydreamTable = () => {
    const storagePublicUrl = getStoragePublicUrl("")

    const [dreams, setDreams] = useState<Tables<'daydreams'>[]>([]);
    const [pagination, setPagination] = useState<PaginationProps>(DEFAULT_PAGINATION_VALUES);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);

        getAllDaydreams({
            page: pagination.current_page,
            per_page: pagination.per_page,
        }).then(({data, pagination}) => {
            setDreams(data)

            if (pagination) {
                setPagination(pagination);
            }

            setIsLoading(false);
        })

        return () => controller.abort()
    }, [pagination.current_page, pagination.per_page])

    return (
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
                {dreams.length ? dreams.map(item => (
                    <tr key={`dream-${item.id}`}>
                        <td className="text-center">
                            <div className="relative block aspect-square w-32 h-32 overflow-hidden">
                                <Image
                                    src={`${storagePublicUrl}${item.image_path}`}
                                    alt="Something"
                                    height={128}
                                    width={128}
                                    className="object-cover object-center point-events-none"
                                    quality={75}
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
                                    data-tooltip-id="admin-tooltip"
                                    data-tooltip-content="Edit"
                                    rounded
                                >
                                    <FaPencilAlt/>
                                </Button>

                                <Button
                                    icon
                                    data-tooltip-id="admin-tooltip"
                                    data-tooltip-content="Delete"
                                    rounded
                                >
                                    <FaTrash/>
                                </Button>
                            </div>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td></td>
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
                        isLoading={isLoading}
                    />
                </div>
            </CardFooter>
        </CardRoot>
    )
}


export default DaydreamTable;
