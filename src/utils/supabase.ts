import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Filterable, Paginatable, Sortable } from "@/types";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { getRange } from "@/utils/pagination";
import { removeEmptyValues } from "@/utils/index";
import { Database } from "@/types/supabase";

export const supabase = createClientComponentClient<Database>();

interface queryFilterBuilder<Row extends Record<string, unknown>>
  extends Sortable<any>,
    Filterable<any> {
  textSearch?: { column: string; value: any };
  query: PostgrestFilterBuilder<any, any, Row[], unknown>;
}

export const queryFilterBuilder = <Row extends Record<string, unknown>>({
  textSearch,
  query,
  filter = {},
  sort = [],
}: queryFilterBuilder<Row>) => {
  if (!!textSearch && !!textSearch.value) {
    query = query.textSearch(textSearch.column, textSearch.value);
  }

  if (Object.keys(filter).length) {
    query = query.match(removeEmptyValues(filter));
  }

  sort.forEach((item) => {
    query = query.order(item.column as string, {
      ascending: item.order === "asc",
    });
  });

  return query;
};

interface queryPaginationBuilder<Row extends Record<string, unknown>>
  extends Required<Paginatable> {
  query: PostgrestFilterBuilder<any, any, Row[], unknown>;
}

export const queryPaginationBuilder = <Row extends Record<string, unknown>>({
  query,
  page,
  per_page,
}: queryPaginationBuilder<Row>) => {
  if (Number.isInteger(page) && Number.isInteger(per_page)) {
    const { from, to } = getRange(Number(per_page), Number(page));

    query = query.range(from, to);
  }

  return query;
};
