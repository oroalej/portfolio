import { Tables } from "@/types";

export type Buckets = "images";

export interface UploadData<FileType = FileList | null>
  extends Pick<Tables<"files">, "size" | "type" | "name">,
    Partial<Pick<Tables<"files">, "width" | "height" | "duration">> {
  file: FileType;
}

export interface ImageFileData<FileType = FileList | null>
  extends Required<Omit<UploadData<FileType>, "duration">> {}

export interface AudioOrVideoFileData<FileType = FileList | null>
  extends Required<Omit<UploadData<FileType>, "duration">> {}

export interface FileData<FileType = FileList | null>
  extends Required<
    Omit<UploadData<FileType>, "width" | "height" | "duration">
  > {}