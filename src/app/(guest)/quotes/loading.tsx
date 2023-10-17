import {Container} from "@/components";
import CategoryListLoading from "@/app/(guest)/quotes/_components/Loading/CategoryListLoading";
import QuoteListLoading from "@/app/(guest)/quotes/_components/Loading/QuoteListLoading";

const GuestQuoteLoading = () => {
    return (
        <div className="py-16">
            <Container>
                <CategoryListLoading />
                <QuoteListLoading />
            </Container>
        </div>
    )
}

export default GuestQuoteLoading;
