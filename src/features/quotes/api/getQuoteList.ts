import { keepPreviousData, useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase";
import { generatePaginationData, getRange } from "@/utils/pagination";
import { Filterable, Paginatable, Sortable, Tables } from "@/types";
import { durationInMinutes } from "@/utils";

type QuoteListSortable = Pick<Tables<"quotes">, "created_at" | "source_id">;
type QuoteListFilterable = Pick<
  Tables<"quotes">,
  "category_id" | "source_id" | "media_detail_id"
>;

interface getQuotesParams
  extends Required<Paginatable>,
    Sortable<QuoteListSortable>,
    Filterable<QuoteListFilterable> {}

interface GetAllQuotesAPIDataStructure
  extends Pick<Tables<"quotes">, "content" | "id" | "created_at"> {
  category: Pick<Tables<"categories">, "id" | "name">;
  source: Pick<Tables<"sources">, "id" | "name">;
  media_detail: Pick<Tables<"media_details">, "id" | "name">;
}

const getQuoteList = ({
  per_page,
  page,
  sort = [],
  filter = {},
}: getQuotesParams) => {
  let query = supabase
    .from("quotes")
    .select(
      "id, content, created_at, category:categories(id, name), source:sources(id, name), media_detail:media_details(id, name)",
      { count: "exact" }
    );

  if (Object.keys(filter).length) {
    query = query.match(filter);
  }

  sort.forEach((item) => {
    query = query.order(item.column as string, {
      ascending: item.order === "asc",
    });
  });

  if (Number.isInteger(page) && Number.isInteger(per_page)) {
    const { from, to } = getRange(Number(per_page), Number(page));

    query = query.range(from, to);
  }

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
