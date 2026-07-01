import { Tables } from "@/types";

export type DaydreamImageFile = Pick<
  Tables<"files">,
  | "bucket_name"
  | "height"
  | "id"
  | "name"
  | "size"
  | "storage_file_path"
  | "type"
  | "width"
>;

export interface DreamFormImage
  extends Pick<Tables<"daydream_images">, "file_id">,
    Partial<Pick<Tables<"daydream_images">, "id" | "image_order">> {
  file?: Partial<DaydreamImageFile>;
}

export interface DreamFormParams
  extends Omit<Tables<"daydreams">, "id" | "created_at"> {
  images: DreamFormImage[];
}

export interface DaydreamAPIDataStructure
  extends Tables<"daydreams"> {
  images: DaydreamImageAPIDataStructure[];
}

export interface DaydreamImageAPIDataStructure
  extends Tables<"daydream_images"> {
  file: DaydreamImageFile;
}
