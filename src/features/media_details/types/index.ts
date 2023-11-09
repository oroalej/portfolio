import { Tables } from "@/types";

export interface MediaDetailAPIDataStructure
  extends Omit<Tables<"media_details">, "created_at"> {}
