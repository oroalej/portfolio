export const MAX_IMAGE_FILE_SIZE = 52428800; // 50MB
export const MAX_IMAGE_FILE_SIZE_LABEL = "50MB";

export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

export const ACCEPTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
] as const;

export const ACCEPTED_IMAGE_TYPE_LABELS = [
  "JPG",
  "JPEG",
  "PNG",
  "WEBP",
  "GIF",
  "AVIF",
] as const;

export const ACCEPTED_IMAGE_INPUT_TYPES = [
  ...ACCEPTED_IMAGE_MIME_TYPES,
  ...ACCEPTED_IMAGE_EXTENSIONS,
];

export const ACCEPTED_IMAGE_TYPE_LABEL_TEXT = `${ACCEPTED_IMAGE_TYPE_LABELS.slice(0, -1).join(", ")}, and ${
  ACCEPTED_IMAGE_TYPE_LABELS[ACCEPTED_IMAGE_TYPE_LABELS.length - 1]
}`;

type AcceptedImageMimeType = (typeof ACCEPTED_IMAGE_MIME_TYPES)[number];

const IMAGE_EXTENSION_MIME_TYPES: Record<string, AcceptedImageMimeType> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

const isAcceptedImageMimeType = (
  mimeType: string
): mimeType is AcceptedImageMimeType =>
  ACCEPTED_IMAGE_MIME_TYPES.includes(mimeType as AcceptedImageMimeType);

export const getFileExtension = (fileName: string) => {
  const extensionStartIndex = fileName.lastIndexOf(".");

  if (extensionStartIndex < 0) return "";

  return fileName.slice(extensionStartIndex).toLowerCase();
};

export const getAcceptedImageMimeType = ({
  name,
  type,
}: Pick<File, "name" | "type">): AcceptedImageMimeType | null => {
  const normalizedMimeType = type.trim().toLowerCase();

  if (isAcceptedImageMimeType(normalizedMimeType)) return normalizedMimeType;

  if (normalizedMimeType) return null;

  return IMAGE_EXTENSION_MIME_TYPES[getFileExtension(name)] ?? null;
};

export const isAcceptedImageFile = (file: Pick<File, "name" | "type">) =>
  getAcceptedImageMimeType(file) !== null;
