import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import {
  useGetCategoryList,
  useStoreCategoryMutation,
} from "@/features/categories/api";

const CategorySearchableSelect = ({
  onChange,
  ...props
}: Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name">) => {
  const categoriesQuery = useGetCategoryList();
  const storeCategoryMutation = useStoreCategoryMutation();

  const onCreateHandler = useCallback(async (value: string) => {
    const data = await storeCategoryMutation.mutateAsync({
      name: value,
    });

    onChange(data.id);
  }, []);

  return (
    <SearchableSelect
      {...props}
      name="category"
      options={
        categoriesQuery.data?.map((category) => ({
          text: category.name,
          value: category.id,
        })) || []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default CategorySearchableSelect;
