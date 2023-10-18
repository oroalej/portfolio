"use client";

import {usePathname, useSearchParams} from "next/navigation";
import {removeEmptyValues} from "@/utils";
import {useEffect} from "react";

const params: Record<string, string> = {};

const useSetParamsRouter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
    }, [searchParams]);

    const getParams = () => params;

    const getParam = (key: string, defaultValue: string | null = null) => params[key] || defaultValue

    const setParam = (key: string, value: string | number) => {
        params[key] = value.toString();
    }

    const getUrl = () => `${pathname}?${(new URLSearchParams(removeEmptyValues(params))).toString()}`;

    return {
        setParam,
        getUrl,
        getParams,
        getParam
    }
}

export default useSetParamsRouter;
