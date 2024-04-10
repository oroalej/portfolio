"use client";

import { useEffect } from "react";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";
import { useRouter } from "next/navigation";
import { QuotesListLoading } from "@/app/(web)/quotes/[quoteId]/_components/QuotesList";

const RedirectToQuoteId = () => {
  const router = useRouter();

  const { data: termList } = useGetTermList();
  const { data, isLoading } = useGetTaxonomyByTermId({
    filter: {
      term_id: termList?.find(
        (item) => item.identifier === TERM_IDENTIFIER.QUOTE_CATEGORY
      )?.id,
    },
  });

  const taxonomy = data?.find(Boolean);

  useEffect(() => {
    if (taxonomy) router.replace(`/quotes/${taxonomy.id}`);
  }, [taxonomy?.id]);

  return <QuotesListLoading />;
};

export default RedirectToQuoteId;
