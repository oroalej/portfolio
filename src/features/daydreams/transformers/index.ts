import { GalleryItem } from "@/context/GalleryContext";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";

export const DaydreamGalleryItemsTransformer = (
  item: DaydreamAPIDataStructure
): GalleryItem[] =>
  item.images.map(({ file }) => ({
    storage_file_path: file.storage_file_path,
    name: file.name,
    height: file.height,
    width: file.width,
  }));
