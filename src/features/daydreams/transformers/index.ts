import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { GalleryItem } from "@/context/GalleryContext";

export const DaydreamGalleryItemTransformer = (
  item: DaydreamAPIDataStructure
): GalleryItem => ({
  storage_file_path: item.file.storage_file_path,
  name: item.file.name,
  height: item.file.height,
  width: item.file.width,
});
