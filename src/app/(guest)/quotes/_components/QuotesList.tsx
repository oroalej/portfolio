"use client";

import { CardRoot, SimplePagination } from "@/components";
import { Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { removeEmptyValues } from "@/utils";
import { useGetQuoteList } from "@/features/quotes/api";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import QuoteListLoading from "@/app/(guest)/quotes/_components/Loading/QuoteListLoading";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";

const QuotesList = () => {
  const searchParams = useSearchParams();
  const { setParam, push } = useSetParamsRouter();

  const { isLoading, isFetching, data } = useGetQuoteList({
    per_page: DEFAULT_PAGINATION_VALUES.per_page,
    page:
      Number(searchParams.get("page")) ||
      DEFAULT_PAGINATION_VALUES.current_page,
    filter: removeEmptyValues({
      category_id: searchParams.get("category_id") || "",
    }),
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isFetching]);

  if (isLoading) {
    return <QuoteListLoading />;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
        {data?.data.map((item) => (
          <CardRoot
            key={item.id}
            className="flex flex-col group hover:shadow-lg hover:-mt-1 hover:mb-1 transition-all"
            rounded
          >
            <div className="px-6 pb-6 pt-16 grow text-2xl text-neutral-700 dark:text-neutral-200 font-bold">
              {item.content}
            </div>
            <div className="px-6 pt-4 pb-6 flex justify-between">
              <p className="inline-block border-b-4 border-transparent transition-colors text-neutral-600 dark:text-white dark:group-hover:text-neutral-200 dark:group-hover:border-neutral-200 text-lg group-hover:border-neutral-700 group-hover:text-neutral-800">
                {`${item.media_detail.name}, ${item.source.name}`}
              </p>
            </div>
          </CardRoot>
        )) ?? (
          <div className="text-center col-span-2 text-xl py-12 dark:text-white ">
            No result
          </div>
        )}
      </div>

      {data?.pagination && data.pagination.last_page !== 1 && (
        <div className="flex flex-row justify-center w-full">
          <SimplePagination
            onChange={(value) => {
              setParam("page", value.toString());
              push();
            }}
            current_page={data.pagination.current_page}
            last_page={data.pagination.last_page}
          />
        </div>
      )}
    </Fragment>
  );
};

export default QuotesList;
