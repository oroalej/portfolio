import { createBrowserClient } from "@supabase/ssr";
import { Filterable, Paginatable, Sortable } from "@/types";
import { getRange } from "@/utils/pagination";
import { removeEmptyValues } from "@/utils/index";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabasePublishableKey
);

interface FilterBuilderQuery {
  textSearch: (column: string, value: any) => any;
  match: (filter: Record<string, unknown>) => any;
  order: (column: string, options: { ascending: boolean }) => any;
}

interface PaginationBuilderQuery {
  range: (from: number, to: number) => any;
}

interface queryFilterBuilder<Query extends FilterBuilderQuery>
  extends Sortable<any>,
    Filterable<any> {
  textSearch?: { column: string; value: any };
  query: Query;
}

export const queryFilterBuilder = <Query extends FilterBuilderQuery>({
  textSearch,
  query,
  filter = {},
  sort = [],
}: queryFilterBuilder<Query>): Query => {
  if (!!textSearch && !!textSearch.value) {
    query = query.textSearch(textSearch.column, textSearch.value) as Query;
  }

  if (Object.keys(filter).length) {
    query = query.match(removeEmptyValues(filter)) as Query;
  }

  sort.forEach((item) => {
    query = query.order(item.column as string, {
      ascending: item.order === "asc",
    }) as Query;
  });

  return query;
};

interface queryPaginationBuilder<Query extends PaginationBuilderQuery>
  extends Required<Paginatable> {
  query: Query;
}

export const queryPaginationBuilder = <Query extends PaginationBuilderQuery>({
  query,
  page,
  per_page,
}: queryPaginationBuilder<Query>): Query => {
  if (Number.isInteger(page) && Number.isInteger(per_page)) {
    const { from, to } = getRange(Number(per_page), Number(page));

    query = query.range(from, to) as Query;
  }

  return query;
};
