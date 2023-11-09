import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSourceListByCategoryId } from "@/features/sources/api/getSourceListByCategoryId";
import { useStoreSourceMutation } from "@/features/sources/api/createSource";
import { sortBy } from "lodash";
import { SourceAPIDataStructure } from "@/features/sources/types";

interface SelectProps
  extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
  categoryId: string;
}

const SourceSearchableSelect = ({
  categoryId,
  onChange,
  ...props
}: SelectProps) => {
  const sourcesQuery = useGetSourceListByCategoryId(categoryId);
  const storeSourceMutation = useStoreSourceMutation();
  const queryClient = useQueryClient();

  const onCreateHandler = useCallback(async (value: string) => {
    const data = await storeSourceMutation.mutateAsync({
      name: value,
      category_id: categoryId,
    });

    onChange(data.id);
  }, []);

  return (
    <SearchableSelect
      {...props}
      name="source"
      options={
        sourcesQuery.data?.map((source) => ({
          text: source.name,
          value: source.id,
        })) || []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default SourceSearchableSelect;
