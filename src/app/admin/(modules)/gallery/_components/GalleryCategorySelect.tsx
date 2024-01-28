import { useGetTermList } from "@/features/terms/api/getTermList";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useCallback } from "react";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { DEFAULT_FORM_VALUES } from "@/features/daydreams/data";
import { SearchableSelect, SearchableSelectProps } from "@/components";

interface GalleryCategorySearchableSelect
  extends Omit<
    SearchableSelectProps<string>,
    "options" | "onCreate" | "name"
  > {}

const GalleryCategorySelect = ({
  value,
  onChange,
  ...props
}: GalleryCategorySearchableSelect) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.GALLERY_CATEGORIES
  );
  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  const onCreateHandler = useCallback(
    async (name: string) => {
      const response = await storeTaxonomyMutation.mutateAsync({
        term_id: termData!.id,
        name,
      });

      onChange(response.id);
    },
    [termData]
  );

  return (
    <SearchableSelect
      options={
        data?.map((item) => ({
          text: item.name,
          value: item.id,
        })) ?? []
      }
      value={value}
      onChange={onChange}
      onCreate={onCreateHandler}
      {...props}
    />
  );
};

export default GalleryCategorySelect;
