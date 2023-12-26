import { Tables } from "@/types";

export interface ProjectAPIDataStructure extends Tables<"projects"> {
  project_type: Pick<Tables<"term_taxonomy">, "name">;
  screenshots: ScreenshotAPIDataStructure[];
  skills: {
    id: string;
    skill_id: string;
    skill: Pick<Tables<"term_taxonomy">, "name">;
  }[];
}

export interface ScreenshotAPIDataStructure {
  id: string;
  file_id: string;
  title: string;
  screenshot_order: number;
  file: Pick<
    Tables<"files">,
    "id" | "bucket_name" | "storage_file_path" | "name"
  > &
    Required<Pick<Tables<"files">, "width" | "height">>;
}
