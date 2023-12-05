import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";

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
  const { data: termData } = useGetTermByIdentifier(TERM_IDENTIFIER.SOURCE);
  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id, parent_id: categoryId },
  });

  const onCreateHandler = useCallback(async (value: string) => {
    if (!termData?.id || !categoryId) return;

    const data = await storeTaxonomyMutation.mutateAsync({
      name: value,
      term_id: termData.id,
      parent_id: categoryId,
    });

    onChange(data.id);
  }, []);

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
