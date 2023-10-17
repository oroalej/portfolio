import QuoteCardLoading from "@/app/(guest)/quotes/_components/Loading/QuoteCardLoading";

const QuoteListLoading = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(3)].map((_, index) => (
            <QuoteCardLoading key={`quote-card-loading-${index}`}/>
        ))}
    </div>
)

export default QuoteListLoading;
