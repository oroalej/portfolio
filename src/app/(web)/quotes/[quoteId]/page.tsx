import Container from "@/app/(web)/_components/Container";
import {
  QuoteNavigation,
  QuoteNavigationLoading,
} from "@/app/(web)/quotes/[quoteId]/_components/QuoteNavigation";
import {
  QuotesList,
  QuotesListLoading,
} from "@/app/(web)/quotes/[quoteId]/_components/QuotesList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Quotes",
};

const QuoteIdPage = () => {
  return (
    <Container className="py-20">
      <Suspense fallback={<QuoteNavigationLoading />}>
        <QuoteNavigation />
      </Suspense>
      <Suspense fallback={<QuotesListLoading />}>
        <QuotesList />
      </Suspense>
    </Container>
  );
};

export default QuoteIdPage;
