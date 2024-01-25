"use client";

import { SingleSelectProps, SingleSimpleSelect } from "@/components";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { useGetTermList } from "@/features/terms/api/getTermList";

export const ProjectTypeSelect = (
  props: Pick<
    SingleSelectProps<string, TaxonomyAPIDataStructure>,
    "onChange" | "value" | "defaultValue" | "error" | "placeholder"
  >
) => {
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.PROJECT_TYPES
  );
  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  return (
    <SingleSimpleSelect<string, TaxonomyAPIDataStructure>
      {...props}
      optionValue="id"
      optionText="name"
      options={data ?? []}
    />
  );
};
