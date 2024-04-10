import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { useGetTaxonomyByTermAndParentId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTermList } from "@/features/terms/api/getTermList";

interface SelectProps
  extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
  categoryId: string;
}

const SourceSearchableSelect = ({
  categoryId,
  onChange,
  ...props
}: SelectProps) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.SOURCE
  );

  const { data } = useGetTaxonomyByTermAndParentId({
    filter: { term_id: termData?.id, parent_id: categoryId },
  });

  const onCreateHandler = useCallback(
    async (value: string) => {
      if (!termData?.id || !categoryId) return;

      const data = await storeTaxonomyMutation.mutateAsync({
        formData: {
          name: value,
          term_id: termData.id,
          parent_id: categoryId,
        },
      });

      onChange(data.id);
    },
    [termData?.id, categoryId]
  );

  return (
    <SearchableSelect
      {...props}
      name="source"
      options={
        data?.map((source) => ({
          text: source.name,
          value: source.id,
        })) ?? []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default SourceSearchableSelect;
