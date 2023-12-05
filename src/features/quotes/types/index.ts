import { Tables } from "@/types";

export interface QuoteAPIDataStructure extends Tables<"quotes"> {
  category: Pick<Tables<"term_taxonomy">, "name">;
  source: Pick<Tables<"term_taxonomy">, "name">;
  media_detail: Pick<Tables<"term_taxonomy">, "name">;
}

export interface GetAllQuotesAPIDataStructure
  extends Pick<Tables<"quotes">, "content" | "id" | "created_at"> {
  category: Pick<Tables<"term_taxonomy">, "name">;
  source: Pick<Tables<"term_taxonomy">, "name">;
  media_detail: Pick<Tables<"term_taxonomy">, "name">;
}
