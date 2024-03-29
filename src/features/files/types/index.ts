import { Tables } from "@/types";

export type Buckets = "images";

export interface UploadFile
  extends Pick<Tables<"files">, "size" | "type" | "name" | "category_id"> {
  file: File | null;
}

export interface ImageFileData
  extends UploadFile,
    Required<Pick<Tables<"files">, "width" | "height">> {
  blob?: string;
}

export interface AudioOrVideoFileData
  extends UploadFile,
    Required<Pick<Tables<"files">, "duration">> {}

export interface FileAPIDataStructure extends Tables<"files"> {
  category?: Pick<Tables<"term_taxonomy">, "id" | "name">;
}
