import { Tables } from "@/types";

export interface TermAPIDataStructure
  extends Omit<Tables<"terms">, "description"> {}
