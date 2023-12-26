import { useQuery } from "@tanstack/react-query";
import { removeEmptyValues } from "@/utils";
import { queryFilterBuilder, supabase } from "@/utils/supabase";
import { TaxonomyAPIDataStructure } from "@/features/term_taxonomy/types";
import { Filterable, Searchable, Sortable, Tables } from "@/types";

export type TaxonomySortableColumns = Pick<Tables<"term_taxonomy">, "name">;
export type TaxonomyFilterableColumns = Pick<
  Tables<"term_taxonomy">,
  "term_id" | "parent_id"
>;

export interface GetTaxonomyByTermId
  extends Searchable,
    Sortable<TaxonomySortableColumns>,
    Filterable<TaxonomyFilterableColumns> {}

export const getTaxonomyByTermId = ({
  q,
  sort = [],
  filter = {},
}: GetTaxonomyByTermId) => {
  let query = supabase
    .from("term_taxonomy")
    .select("id, term_id, parent_id, name");

  query = queryFilterBuilder({
    query,
    textSearch: { column: "name", value: q },
    sort: [...sort, { column: "name", order: "asc" }],
    filter: removeEmptyValues(filter),
  });

  return query.throwOnError();
};

export const useGetTaxonomyByTermId = ({
  filter = {},
  sort = [],
  q,
}: GetTaxonomyByTermId) => {
  const termIdExists = filter?.hasOwnProperty("term_id") && !!filter?.term_id;

  return useQuery({
    enabled: termIdExists,
    staleTime: Infinity,
    queryKey: ["taxonomy", filter],
    queryFn: async (): Promise<TaxonomyAPIDataStructure[]> => {
      const { data } = await getTaxonomyByTermId({ filter, sort, q });

      if (data === null) throw new Error("Data not found.");

      return data;
    },
  });
};
