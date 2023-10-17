"use client";

import {CardFooter, CardRoot, SimplePagination} from "@/components";
import {Fragment, useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getAllQuotes, GetAllQuotesAPIDataStructure} from "@/api/QuoteAPI";
import {removeEmptyValues} from "@/utils";
import {useLoadable} from "@/hooks";
import QuoteListLoading from "@/app/(guest)/quotes/_components/Loading/QuoteListLoading";
import QuoteCardLoading from "@/app/(guest)/quotes/_components/Loading/QuoteCardLoading";
import {DEFAULT_PAGINATION_VALUES, PaginationProps} from "@/utils/pagination";

const QuotesList = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const router = useRouter();

    const [list, setList] = useState<GetAllQuotesAPIDataStructure[] | null>(null);
    const [pagination, setPagination] = useState<PaginationProps>(DEFAULT_PAGINATION_VALUES)
    const {isLoading, startLoading, endLoading} = useLoadable();

    const fetchData = useCallback(async () => {
        const startTime = performance.now();
        let timeout: ReturnType<typeof setTimeout> | null = null;

        try {
            startLoading();

            const {data, pagination} = await getAllQuotes({
                page: Number(searchParams.get("page")) || 1,
                filter: removeEmptyValues({
                    category_id: searchParams.get("category_id") || "",
                })
            });

            if (pagination) setPagination(pagination)

            setList(data);
        } catch (error) {
            console.log(error)
        } finally {
            timeout = setTimeout(() => endLoading(),
                Math.max(0, 500 - (performance.now() - startTime))
            )
        }

        return () => timeout && clearTimeout(timeout);
    }, [searchParams])

    useEffect(() => {
        fetchData().catch(error => console.log(error));
    }, [fetchData])

    if (list === null) {
        return (
            <QuoteListLoading/>
        )
    }

    return (
        <Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
                {isLoading ? [...Array(3)].map((_, index) => (
                    <QuoteCardLoading key={`quote-card-loading-${index}`}/>
                )) : list.length ? list.map(item => (
                    <CardRoot key={item.id}
                              className="flex flex-col group hover:shadow-lg hover:-mt-1 hover:mb-1 transition-all"
                              rounded>
                        <div className="px-6 pb-6 pt-16 grow text-2xl text-neutral-700 font-bold">
                            {/*<div className="absolute top-2.5 right-2.5 flex justify-end group-hover:opacity-100 opacity-0 transition-opacity">*/}
                            {/*    <Button*/}
                            {/*        icon*/}
                            {/*        rounded*/}
                            {/*        variant="text"*/}
                            {/*        color="secondary"*/}
                            {/*        data-tooltip-id="guest-tooltip"*/}
                            {/*        data-tooltip-content="Download"*/}
                            {/*    >*/}
                            {/*        <FaDownload/>*/}
                            {/*    </Button>*/}

                            {/*    <Button*/}
                            {/*        icon*/}
                            {/*        rounded*/}
                            {/*        variant="text"*/}
                            {/*        color="secondary"*/}
                            {/*        data-tooltip-id="guest-tooltip"*/}
                            {/*        data-tooltip-content="Copy"*/}
                            {/*    >*/}
                            {/*        <FaRegCopy/>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            {item.content}
                        </div>
                        <CardFooter>

                        </CardFooter>
                        <div className="px-6 pt-4 pb-6 flex justify-between">
                            <p className="inline-block border-b-4 border-transparent transition-colors text-neutral-600 text-lg group-hover:border-neutral-700 group-hover:text-neutral-800">
                                {`${item.media_detail.name}, ${item.source.name}`}
                            </p>
                        </div>
                    </CardRoot>
                )) : (
                    <div className="text-center col-span-2 text-xl py-12">
                        No result
                    </div>
                )}
            </div>

            {pagination.last_page !== 1 && (
                <div className="flex flex-row justify-center w-full">
                    <SimplePagination
                        onChange={value => {
                            const params = new URLSearchParams(searchParams);
                            params.set('page', value.toString());

                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        current_page={pagination.current_page}
                        last_page={pagination.last_page}
                    />
                </div>
            )}
        </Fragment>
    )
}

export default QuotesList;
