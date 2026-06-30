import { QuotesList } from "@/app/(web)/quotes/[quoteId]/_components/QuotesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Quotes",
};

const QuoteIdPage = async ({ params }: PageProps<"/quotes/[quoteId]">) => {
  const { quoteId } = await params;

  return <QuotesList quoteId={quoteId} />;
};

export default QuoteIdPage;
