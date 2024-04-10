"use client";

import {
  MultiSearchableSelect,
  SearchableMultiSelectProps,
} from "@/components/Select/MultiSearchableSelect";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { useCallback } from "react";

interface SkillSearchableSelect
  extends Omit<SearchableMultiSelectProps, "options" | "onCreate" | "name"> {}

const SkillSearchableSelect = ({
  value = [],
  onChange,
  ...props
}: SkillSearchableSelect) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.SKILL
  );
  const { data: skills } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  const onCreateHandler = useCallback(
    async (name: string) => {
      const response = await storeTaxonomyMutation.mutateAsync({
        formData: {
          term_id: termData!.id,
          name,
        },
      });

      onChange([response.id, ...value]);
    },
    [termData]
  );

  return (
    <MultiSearchableSelect
      {...props}
      name="skills"
      options={
        skills?.map((item) => ({
          text: item.name,
          value: item.id,
        })) ?? []
      }
      value={value}
      onChange={onChange}
      onCreate={onCreateHandler}
      onClear={() => onChange([])}
    />
  );
};

export default SkillSearchableSelect;
