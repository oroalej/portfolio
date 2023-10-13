"use client";

import {Fragment, useEffect, useState} from "react";
import {SimplePagination} from "@/components";
import {useOpenable} from "@/hooks";
import {useGalleryContext} from "@/context/GalleryContext";
import {getAllDaydreams} from "@/api/DaydreamAPI";
import {DaydreamCard, DaydreamCardLoading} from "@/app/(guest)/daydreams/_components/DaydreamCard";
import {PreviewDreamDialog} from "@/app/(guest)/daydreams/_components/PreviewDreamDialog";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";

const DaydreamList = () => {
    const {list = [], setList, setSelectedIndex, selectedIndex} = useGalleryContext();
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationProps>(DEFAULT_PAGINATION_VALUES)
    const {isOpen, onOpen, onClose} = useOpenable();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        getAllDaydreams({
            per_page: pagination.per_page,
            page: pagination.current_page,
            sort: [
                {column: "year", order: "desc"},
                {column: "created_at", order: "desc"}
            ]
        }).then(({data, pagination}) => {
            setList(data);

            if (pagination) setPagination(pagination)

            setIsLoading(false);
        })
    }, [pagination.current_page])

    const onSelectHandler = (index: number) => {
        setSelectedIndex(index);
        onOpen();
    }

    return (
        <Fragment>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                {isLoading ? [...Array(2)].map((_, index) => (
                    <DaydreamCardLoading
                        key={`daydream-loader-${index}`}
                    />
                )) : list.length ? list.map((item, index) => (
                    <DaydreamCard
                        key={`image-${item.id}-${index}`}
                        image_path={item.file.storage_file_path}
                        iso={item.iso}
                        shutter_speed={item.shutter_speed}
                        aperture={item.aperture}
                        year={item.year}
                        description={item.description}
                        onSelect={() => onSelectHandler(index)}
                    />
                )) : (
                    <div className="text-center col-span-2">
                        {"I'm sorry, I haven't uploaded yet..."}
                    </div>
                )}
            </div>

            {Number.isInteger(selectedIndex) && (
                <PreviewDreamDialog onClose={onClose} isOpen={isOpen}/>
            )}

            {pagination.last_page !== 1 && (
                <div className="flex justify-center my-16">
                    <SimplePagination
                        onChange={value => setPagination((prevState) => ({
                            ...prevState,
                            current_page: value
                        }))}
                        current_page={pagination.current_page}
                        last_page={pagination.last_page}
                        size="large"
                    />
                </div>
            )}
        </Fragment>
    )
}
export default DaydreamList;
