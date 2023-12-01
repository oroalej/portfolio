"use client";

import {
  MultiSearchableSelect,
  SearchableMultiSelectProps,
} from "@/components/Select/MultiSearchableSelect";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useStoreTaxonomyMutation } from "@/features/term_taxonomy/api/createTaxonomy";

interface SkillSearchableSelect
  extends Omit<SearchableMultiSelectProps, "options" | "onCreate" | "name"> {}

const SkillSearchableSelect = ({
  value = [],
  onChange,
  ...props
}: SkillSearchableSelect) => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();

  const { data: termData } = useGetTermByIdentifier(TERM_IDENTIFIER.SKILL);
  const { data: skills } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  const onCreateHandler = async (name: string) => {
    const response = await storeTaxonomyMutation.mutateAsync({
      term_id: termData!.id,
      name,
    });

    onChange([response.id, ...value]);
  };

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
