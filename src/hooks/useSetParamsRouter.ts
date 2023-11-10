import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/utils";
import { useEffect } from "react";

let params: Record<string, string> = {};

const useSetParamsRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  }, [searchParams]);

  useEffect(() => {
    params = {};
  }, [pathname]);

  const getParams = () => params;

  const getParam = (key: string, defaultValue: string | null = null) =>
    params[key] || defaultValue;

  const setParam = (key: string, value: string | number) => {
    params[key] = value.toString();
  };

  const removeParam = (key: string) => delete params[key];

  const getUrl = () =>
    `${pathname}?${new URLSearchParams(removeEmptyValues(params)).toString()}`;

  const push = () => router.push(getUrl());

  return {
    setParam,
    getUrl,
    getParams,
    getParam,
    removeParam,
    push,
  };
};

export default useSetParamsRouter;
