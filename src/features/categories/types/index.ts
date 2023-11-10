import { Tables } from "@/types";

export interface CategoryAPIDataStructure
  extends Pick<Tables<"categories">, "id" | "name" | "slug"> {}
