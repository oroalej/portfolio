import {ImageFileData, Tables} from "@/types";

export interface CreateDreamFormInterface extends Omit<Tables<'daydreams'>, "id" | "created_at" | "file_id"> {
    image: ImageFileData
}
