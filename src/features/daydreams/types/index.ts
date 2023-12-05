import { Tables } from "@/types";

export interface DreamFormParams
  extends Omit<Tables<"daydreams">, "id" | "created_at"> {
  file?: Partial<
    Pick<Tables<"files">, "bucket_name" | "storage_file_path" | "name" | "id">
  >;
}

export interface DaydreamAPIDataStructure
  extends Omit<Tables<"daydreams">, "file_id"> {
  file: Omit<Tables<"files">, "duration" | "created_at">;
}
