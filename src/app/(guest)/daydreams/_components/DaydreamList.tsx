"use client";

import {Fragment, Suspense, useCallback, useEffect, useState} from "react";
import {SimplePagination} from "@/components";
import {useOpenable} from "@/hooks";
import {useGalleryContext} from "@/context/GalleryContext";
import {getAllDaydreams} from "@/api/DaydreamAPI";
import {DaydreamCard, DaydreamCardLoading} from "@/app/(guest)/daydreams/_components/DaydreamCard";
import {PreviewDreamDialog} from "@/app/(guest)/daydreams/_components/PreviewDreamDialog";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";
import {useRouter, useSearchParams} from "next/navigation";

const DaydreamList = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const {list = [], setList, setSelectedIndex, selectedIndex} = useGalleryContext();
    const {isOpen, onOpen, onClose} = useOpenable();
    const {setParam, getUrl} = useSetParamsRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationProps>({
        ...DEFAULT_PAGINATION_VALUES,
        per_page: Number(searchParams.get("per_page")) || DEFAULT_PAGINATION_VALUES.per_page,
        current_page: Number(searchParams.get("page")) || DEFAULT_PAGINATION_VALUES.current_page,
    });

    const fetchData = useCallback(async () => {
        const data = await getAllDaydreams({
            per_page: Number(searchParams.get('per_page')) || DEFAULT_PAGINATION_VALUES.per_page,
            page: Number(searchParams.get('page')) || DEFAULT_PAGINATION_VALUES.current_page,
            sort: [
                {column: "year", order: "desc"},
                {column: "created_at", order: "desc"}
            ]
        });

        if (data.pagination) setPagination(data.pagination);

        setList(data.data);
        setIsLoading(false);
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        fetchData().catch(error => console.log(error));
    }, [fetchData])

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
                    <Suspense
                        key={`image-${item.id}-${index}`}
                        fallback={<DaydreamCardLoading/>}
                    >
                        <DaydreamCard
                            image_path={item.file.storage_file_path}
                            iso={item.iso}
                            shutter_speed={item.shutter_speed}
                            aperture={item.aperture}
                            year={item.year}
                            description={item.description}
                            onSelect={() => onSelectHandler(index)}
                        />
                    </Suspense>
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
                        onChange={value => {
                            setParam('page', value);
                            router.push(getUrl());
                        }}
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
