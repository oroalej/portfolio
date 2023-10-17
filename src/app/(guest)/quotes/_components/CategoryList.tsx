"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import {useEffect, useState} from "react";
import {CategoryAPIDataStructure, getAllCategories} from "@/api/CategoryAPI";
import {removeEmptyValues} from "@/utils";
import CategoryListLoading from "@/app/(guest)/quotes/_components/Loading/CategoryListLoading";
import {useLoadable} from "@/hooks";

const CategoryList = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

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


    const onClickHandler = (category: CategoryAPIDataStructure) => {
        const params = new URLSearchParams(removeEmptyValues({
            category_id: category.id,
            page: 1
        }));

        router.push(`${pathname}?${params}`);
    }

    if (categories === null || isLoading) {
        return <CategoryListLoading/>
    }

    return (
        <div className="overflow-x-auto flex flex-row gap-4 mb-8 pb-4 sm:pb-0 snap-x">
            <Link
                href={"/quotes"}
                shallow
                className={classNames("px-3 py-2 cursor-pointer hover:bg-neutral-200 rounded-md snap-start", {
                    "bg-neutral-200": searchParams.get('category_id') === null
                })}
            >
                All
            </Link>

            {categories.map(category => (
                <button
                    key={category.id}
                    className={classNames("px-3 py-2 cursor-pointer hover:bg-neutral-200 rounded-md snap-start", {
                        "bg-neutral-200": searchParams.get('category_id') === category.id
                    })}
                    onClick={() => onClickHandler(category)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}


export default CategoryList;
