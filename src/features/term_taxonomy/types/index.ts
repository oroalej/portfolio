import { Tables } from "@/types";

export interface TaxonomyAPIDataStructure
  extends Omit<Tables<"term_taxonomy">, "description"> {}
