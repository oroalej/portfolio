import Container from "@/app/(web)/_components/Container";
import {
  QuoteNavigation,
  QuoteNavigationLoading,
} from "@/app/(web)/quotes/[quoteId]/_components/QuoteNavigation";
import { QuotesListLoading } from "@/app/(web)/quotes/[quoteId]/_components/QuotesList";
import { Suspense } from "react";

const QuoteIdLoadingPage = () => (
  <Container className="py-20">
    <Suspense fallback={<QuoteNavigationLoading />}>
      <QuoteNavigation />
    </Suspense>
    <QuotesListLoading />
  </Container>
);

export default QuoteIdLoadingPage;
