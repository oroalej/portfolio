import { Tables } from "@/types";

export interface SourceAPIDataStructure
  extends Omit<Tables<"sources">, "created_at"> {}
