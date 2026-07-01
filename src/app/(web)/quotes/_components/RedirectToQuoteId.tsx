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
  const { data } = useGetTaxonomyByTermId({
    filter: {
      term_id: termList?.find(
        (item) => item.identifier === TERM_IDENTIFIER.QUOTE_CATEGORY
      )?.id,
    },
  });

  const taxonomyId = data?.find(Boolean)?.id;

  useEffect(() => {
    if (taxonomyId) router.replace(`/quotes/${taxonomyId}`);
  }, [router, taxonomyId]);

  return <QuotesListLoading />;
};

export default RedirectToQuoteId;
