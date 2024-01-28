import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  queryFilterBuilder,
  queryPaginationBuilder,
  supabase,
} from "@/utils/supabase";
import { generatePaginationData } from "@/utils/pagination";
import { durationInMinutes } from "@/utils";
import { Filterable, Paginatable, Searchable, Sortable, Tables } from "@/types";

type QuoteListSortable = Pick<Tables<"quotes">, "created_at" | "source_id">;
type QuoteListFilterable = Pick<
  Tables<"quotes">,
  "category_id" | "source_id" | "media_detail_id"
>;

interface getQuotesParams
  extends Required<Paginatable>,
    Sortable<QuoteListSortable>,
    Filterable<QuoteListFilterable>,
    Searchable {}

interface GetAllQuotesAPIDataStructure
  extends Pick<Tables<"quotes">, "content" | "id" | "created_at"> {
  category: Pick<Tables<"term_taxonomy">, "id" | "name">;
  source: Pick<Tables<"term_taxonomy">, "id" | "name">;
  media_detail: Pick<Tables<"term_taxonomy">, "id" | "name">;
}

const getQuoteList = ({
  per_page,
  page,
  q,
  sort = [],
  filter = {},
}: getQuotesParams) => {
  let query = supabase
    .from("quotes")
    .select(
      "id, content, created_at, category:category_id(name), source:source_id(name), media_detail:media_detail_id(name)",
      {
        count: "exact",
      }
    );

  query = queryFilterBuilder({
    query,
    textSearch: { column: "content", value: q },
    sort,
    filter,
  });

  query = queryPaginationBuilder({
    query,
    page,
    per_page,
  });

  query = query.throwOnError();

  return query;
};

export const useGetQuoteList = (params: getQuotesParams) =>
  useQuery({
    placeholderData: keepPreviousData,
    staleTime: durationInMinutes(2),

    queryKey: ["quotes", params],
    queryFn: async () => {
      const { data, count } = await getQuoteList(params);

      return {
        data: (data as unknown as GetAllQuotesAPIDataStructure[]) || [],
        pagination: generatePaginationData(
          Number(params.per_page),
          Number(params.page),
          count || 0
        ),
      };
    },
  });
