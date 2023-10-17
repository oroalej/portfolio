import QuotesList from "@/app/(guest)/quotes/_components/QuotesList";
import CategoryList from "@/app/(guest)/quotes/_components/CategoryList";
import {Container} from "@/components";
import {Metadata} from "next";
import {Suspense} from "react";
import CategoryListLoading from "@/app/(guest)/quotes/_components/Loading/CategoryListLoading";
import QuoteListLoading from "@/app/(guest)/quotes/_components/Loading/QuoteListLoading";

export const metadata: Metadata = {
    title: "Alexander Jeam Oro - Quotes"
}

const GuestQuotesPage = () => {
    return (
        <div className="py-16">
            <Container>
                <Suspense fallback={<CategoryListLoading/>}>
                    <CategoryList/>
                </Suspense>
                <Suspense fallback={<QuoteListLoading/>}>
                    <QuotesList/>
                </Suspense>
            </Container>
        </div>
    )
}

export default GuestQuotesPage;
