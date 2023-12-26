"use client";

import { SimplePagination } from "@/components";
import { useParams } from "next/navigation";
import { useGetQuoteList } from "@/features/quotes/api";
import { Fragment, Suspense } from "react";
import { useQueryState } from "next-usequerystate";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import {
  QuoteCard,
  QuoteCardLoading,
} from "@/app/(web)/quotes/[quoteId]/_components/QuoteCard";

export const QuotesList = () => {
  const { quoteId } = useParams();

  const [page, setPage] = useQueryState("per_page", {
    parse: parseInt,
    shallow: false,
    defaultValue: DEFAULT_PAGINATION_VALUES.current_page,
  });

  const { data, isLoading } = useGetQuoteList({
    per_page: DEFAULT_PAGINATION_VALUES.per_page,
    page: page,
    filter: {
      category_id: quoteId as string,
    },
  });

  if (isLoading) {
    return <QuotesListLoading />;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
        {data?.data.map((item) => (
          <Suspense fallback={<QuoteCardLoading />} key={item.id}>
            <QuoteCard
              content={item.content}
              source_text={item.source.name}
              media_detail_text={item.media_detail.name}
            />
          </Suspense>
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
              setPage(value).catch();
            }}
            current_page={data.pagination.current_page}
            last_page={data.pagination.last_page}
          />
        </div>
      )}
    </Fragment>
  );
};

export const QuotesListLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
    {[...Array(4)].map((_, index) => (
      <QuoteCardLoading key={`quote-card-loading-${index}`} />
    ))}
  </div>
);
