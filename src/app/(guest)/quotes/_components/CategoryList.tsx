"use client";

import classNames from "classnames";
import CategoryListLoading from "@/app/(guest)/quotes/_components/Loading/CategoryListLoading";
import useSetParamsRouter from "@/hooks/useSetParamsRouter";
import { useGetCategoryList } from "@/features/categories/api";

const CategoryList = () => {
  const { setParam, push, removeParam, getParam } = useSetParamsRouter();
  const { isLoading, data } = useGetCategoryList();

  if (isLoading || !data) {
    return <CategoryListLoading />;
  }

  return (
    <div className="overflow-x-auto flex flex-row gap-4 mb-8 pb-4 sm:pb-0 snap-x">
      <button
        className={classNames(
          "px-3 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:text-neutral-800 rounded-md snap-start ",
          [
            getParam("category_id") === null
              ? "bg-neutral-200 dark:text-neutral-800"
              : "text-neutral-800 dark:text-white",
          ]
        )}
        onClick={() => {
          setParam("page", 1);
          removeParam("category_id");
          push();
        }}
      >
        All
      </button>

      {data.map((category) => (
        <button
          key={category.id}
          className={classNames(
            "px-3 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:text-neutral-800 rounded-md snap-start dark:text-white",
            [
              getParam("category_id") === category.id
                ? "bg-neutral-200 dark:text-neutral-800"
                : "text-neutral-800 dark:text-white",
            ]
          )}
          onClick={() => {
            setParam("page", 1);
            setParam("category_id", category.id);
            push();
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
