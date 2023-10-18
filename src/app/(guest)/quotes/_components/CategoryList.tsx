"use client";

import {useRouter} from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import {useEffect, useState} from "react";
import {CategoryAPIDataStructure, getAllCategories} from "@/api/CategoryAPI";
import CategoryListLoading from "@/app/(guest)/quotes/_components/Loading/CategoryListLoading";
import {useLoadable} from "@/hooks";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";

const CategoryList = () => {
    const router = useRouter();

    const {setParam, getUrl, getParam} = useSetParamsRouter();

    const [categories, setCategories] = useState<CategoryAPIDataStructure[] | null>(null)
    const {isLoading, startLoading, endLoading} = useLoadable();

    const fetchData = async () => {
        const startTime = performance.now();

        try {
            startLoading();

            const data = await getAllCategories();

            setCategories(data);
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => endLoading(),
                Math.max(0, 500 - (performance.now() - startTime))
            )
        }
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    if (categories === null || isLoading) {
        return <CategoryListLoading/>
    }

    return (
        <div className="overflow-x-auto flex flex-row gap-4 mb-8 pb-4 sm:pb-0 snap-x">
            <Link
                href={"/quotes"}
                shallow
                className={classNames("px-3 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:text-neutral-800 rounded-md snap-start ", [
                    getParam('category_id') === null ? "bg-neutral-200 dark:text-neutral-800" : "text-neutral-800 dark:text-white"
                ])}
            >
                All
            </Link>

            {categories.map(category => (
                <button
                    key={category.id}
                    className={classNames("px-3 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:text-neutral-800 rounded-md snap-start dark:text-white", [
                        getParam('category_id') === category.id ? "bg-neutral-200 dark:text-neutral-800" : "text-neutral-800 dark:text-white"
                    ])}
                    onClick={() => {
                        setParam('category_id', category.id);
                        router.push(getUrl());
                    }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}


export default CategoryList;
