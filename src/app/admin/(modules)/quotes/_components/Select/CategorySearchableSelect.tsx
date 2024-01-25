import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTermList } from "@/features/terms/api/getTermList";

const CategorySearchableSelect = ({
  onChange,
  ...props
}: Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name">) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.QUOTE_CATEGORY
  );

  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  const onCreateHandler = useCallback(
    async (value: string) => {
      if (!termData?.id) return;

      const data = await storeTaxonomyMutation.mutateAsync({
        term_id: termData!.id,
        name: value,
      });

      onChange(data.id);
    },
    [termData?.id]
  );

  return (
    <SearchableSelect
      {...props}
      name="category"
      options={
        data?.map((category) => ({
          text: category.name,
          value: category.id,
        })) ?? []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default CategorySearchableSelect;
