import { Tables } from "@/types";
import { ImageFileData } from "@/features/files/types";

export interface CreateDreamFormInterface
  extends Omit<Tables<"daydreams">, "id" | "created_at" | "file_id"> {
  image: ImageFileData;
}

export interface DaydreamAPIDataStructure
  extends Omit<Tables<"daydreams">, "file_id"> {
  file: Omit<Tables<"files">, "bucket_name" | "duration" | "created_at">;
}
