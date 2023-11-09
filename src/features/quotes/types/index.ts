import { Tables } from "@/types";

export interface QuoteAPIDataStructure extends Tables<"quotes"> {
  category: Pick<Tables<"categories">, "id" | "name">;
}

export interface GetAllQuotesAPIDataStructure
  extends Pick<Tables<"quotes">, "content" | "id" | "created_at"> {
  category: Pick<Tables<"categories">, "id" | "name">;
  source: Pick<Tables<"sources">, "id" | "name">;
  media_detail: Pick<Tables<"media_details">, "id" | "name">;
}
