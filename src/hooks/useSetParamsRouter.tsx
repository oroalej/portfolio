"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {removeEmptyValues} from "@/utils";
import {useEffect} from "react";

const params: Record<string, string> = {};

const useSetParamsRouter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()

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

    const push = () => router.push(getUrl());

    return {
        setParam,
        getUrl,
        getParams,
        getParam,
        push
    }
}

export default useSetParamsRouter;
