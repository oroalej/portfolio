import { Tables } from "@/types";

export interface TaxonomyAPIDataStructure
  extends Pick<
    Tables<"term_taxonomy">,
    "term_id" | "name" | "description" | "id" | "parent_id"
  > {}

export interface TaxonomyWithParentAPIDataStructure
  extends TaxonomyAPIDataStructure {
  parent: TaxonomyWithParentAPIDataStructure | null;
}
