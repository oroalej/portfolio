import { QuoteNavigation } from "@/app/(web)/quotes/[quoteId]/_components/QuoteNavigation";
import Container from "@/app/(web)/_components/Container";
import { BaseComponent } from "@/types";

const QuoteIndexLayout = ({ children }: Omit<BaseComponent, "className">) => (
  <Container className="py-20">
    <QuoteNavigation />

    {children}
  </Container>
);

export default QuoteIndexLayout;
