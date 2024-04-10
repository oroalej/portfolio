import { QuotesList } from "@/app/(web)/quotes/[quoteId]/_components/QuotesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Quotes",
};

const QuoteIdPage = () => <QuotesList />;

export default QuoteIdPage;
