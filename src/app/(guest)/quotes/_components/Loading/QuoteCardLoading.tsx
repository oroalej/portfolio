import {BaseSkeletonLoader, CardRoot} from "@/components";

const QuoteCardLoading = () => (
    <CardRoot className="flex flex-col">
        <div className="px-6 pb-6 pt-16 grow">
            <BaseSkeletonLoader className="mt-1.5 mb-1" style={{height: "28px"}}/>
            <BaseSkeletonLoader className="mb-1 w-1/2" style={{height: "28px"}}/>
        </div>
        <div className="px-6 pt-4 pb-6">
            <BaseSkeletonLoader className="w-2/3" style={{height: "24px"}}/>
        </div>
    </CardRoot>
)

export default QuoteCardLoading
