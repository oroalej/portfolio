import { SearchableSelect, SearchableSelectProps } from "@/components";
import { useCallback } from "react";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";

interface SelectProps
  extends Omit<SearchableSelectProps<string>, "options" | "onCreate" | "name"> {
  sourceId: string;
}

const MediaDetailSearchableSelect = ({
  sourceId,
  onChange,
  ...props
}: SelectProps) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();
  const { data: termData } = useGetTermByIdentifier(
    TERM_IDENTIFIER.MEDIA_DETAIL
  );
  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id, parent_id: sourceId },
  });

  const onCreateHandler = useCallback(
    async (value: string) => {
      if (!termData?.id || !sourceId) return;

      const data = await storeTaxonomyMutation.mutateAsync({
        term_id: termData.id,
        parent_id: sourceId,
        name: value,
      });

      onChange(data.id);
    },
    [termData?.id, sourceId]
  );

  return (
    <SearchableSelect
      name="media_detail"
      {...props}
      options={
        data?.map((media) => ({
          text: media.name,
          value: media.id,
        })) || []
      }
      onChange={onChange}
      onCreate={onCreateHandler}
    />
  );
};

export default MediaDetailSearchableSelect;
