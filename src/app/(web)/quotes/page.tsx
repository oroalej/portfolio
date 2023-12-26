import { Metadata } from "next";
import RedirectToQuoteId from "@/app/(web)/quotes/_components/RedirectToQuoteId";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Quotes",
};

const QuotePage = () => <RedirectToQuoteId />;

export default QuotePage;
