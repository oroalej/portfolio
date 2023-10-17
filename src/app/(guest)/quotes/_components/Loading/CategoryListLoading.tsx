import CategoryButtonLoading from "@/app/(guest)/quotes/_components/Loading/CategoryButtonLoading";

const CategoryListLoading = () => (
    <div className="overflow-x-auto flex flex-row gap-4 mb-8 pb-4 sm:pb-0">
        {[...Array(3)].map((_, index) => (
            <CategoryButtonLoading key={`category-button-loading-${index}`}/>
        ))}
    </div>
)

export default CategoryListLoading;
