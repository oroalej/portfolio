"use client";

import { useParams } from "next/navigation";
import { useInfiniteQuoteList } from "@/features/quotes/api";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import {
  QuoteCard,
  QuoteCardLoading,
} from "@/app/(web)/quotes/[quoteId]/_components/QuoteCard";

export const QuotesList = () => {
  const { quoteId } = useParams();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuoteList({
    per_page: DEFAULT_PAGINATION_VALUES.per_page,
    page: DEFAULT_PAGINATION_VALUES.current_page,
    filter: {
      category_id: quoteId as string,
    },
    sort: [{ column: "created_at", order: "desc" }],
  });

  const quotes = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage().catch();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <QuotesListLoading />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
        {quotes.length ? (
          quotes.map((item) => (
            <Suspense fallback={<QuoteCardLoading />} key={item.id}>
              <QuoteCard
                content={item.content}
                source_text={item.source.name}
                media_detail_text={item.media_detail?.name}
              />
            </Suspense>
          ))
        ) : (
          <div className="text-center col-span-2 text-xl py-12 dark:text-white ">
            No result
          </div>
        )}

        {isFetchingNextPage &&
          [...Array(2)].map((_, index) => (
            <QuoteCardLoading key={`quote-card-fetching-${index}`} />
          ))}
      </div>

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="h-1 w-full"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export const QuotesListLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans mb-12">
    {[...Array(4)].map((_, index) => (
      <QuoteCardLoading key={`quote-card-loading-${index}`} />
    ))}
  </div>
);
