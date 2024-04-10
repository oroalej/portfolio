import { useQuery } from "@tanstack/react-query";
import { removeEmptyValues } from "@/utils";
import { queryFilterBuilder, supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { Filterable, Searchable, Sortable, Tables } from "@/types";
import { TAXONOMY_QUERY } from "@/features/term_taxonomy/data";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export type TaxonomySortableColumns = Pick<Tables<"term_taxonomy">, "name">;
export type TaxonomyFilterableColumns = Pick<
  Tables<"term_taxonomy">,
  "term_id" | "parent_id"
>;

export interface GetTaxonomyByTermId
  extends Searchable,
    Sortable<TaxonomySortableColumns>,
    Filterable<TaxonomyFilterableColumns> {
  select?: string;
}

interface getTaxonomyQueryFnProps {
  options: GetTaxonomyByTermId;
  isEnabled: boolean;
}

export const getTaxonomy = ({
  q,
  sort = [],
  filter = {},
  select,
}: GetTaxonomyByTermId) => {
  let query = supabase
    .from("term_taxonomy")
    .select(select) as PostgrestFilterBuilder<
    any,
    Record<string, unknown>,
    Record<string, unknown>[],
    unknown
  >;

  query = queryFilterBuilder({
    query,
    textSearch: { column: "name", value: q },
    sort: [...sort, { column: "name", order: "asc" }],
    filter: removeEmptyValues(filter),
  });

  return query.throwOnError();
};

export const useGetTaxonomyByTermId = <Type = TaxonomyAPIDataStructure>({
  filter = {},
  sort = [],
  q,
  select = TAXONOMY_QUERY,
}: GetTaxonomyByTermId) => {
  return useGetTaxonomyQueryFn<Type>({
    isEnabled: !!filter?.term_id,
    options: { q, sort, filter, select },
  });
};

export const useGetTaxonomyByTermAndParentId = <
  Type = TaxonomyAPIDataStructure
>({
  q,
  filter = {},
  sort = [],
  select = TAXONOMY_QUERY,
}: GetTaxonomyByTermId) => {
  return useGetTaxonomyQueryFn<Type>({
    isEnabled: !!filter?.term_id && !!filter?.parent_id,
    options: { q, sort, filter, select },
  });
};

const useGetTaxonomyQueryFn = <Type>({
  isEnabled,
  options,
}: getTaxonomyQueryFnProps) => {
  return useQuery({
    enabled: isEnabled,
    staleTime: Infinity,
    queryKey: ["taxonomy", options],
    queryFn: async (): Promise<Type[]> => {
      const { data } = await getTaxonomy(options);

      if (data === null) throw new Error("Data not found.");

      return data as unknown as Type[];
    },
  });
};
