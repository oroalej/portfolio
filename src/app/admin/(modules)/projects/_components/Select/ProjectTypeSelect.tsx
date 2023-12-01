"use client";

import { SingleSelectProps, SingleSimpleSelect } from "@/components";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";

export const ProjectTypeSelect = (
  props: Pick<
    SingleSelectProps<string, TaxonomyAPIDataStructure>,
    "onChange" | "value" | "defaultValue" | "error" | "placeholder"
  >
) => {
  const { data: termData } = useGetTermByIdentifier(
    TERM_IDENTIFIER.PROJECT_TYPES
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
