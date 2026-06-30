interface ImageDimensionInput {
  height?: number | null;
  width?: number | null;
}

interface SafeImageDimensions {
  height: number;
  width: number;
}

export const FALLBACK_PREVIEW_IMAGE_DIMENSIONS = {
  height: 1024,
  width: 1024,
} satisfies SafeImageDimensions;

const isPositiveFiniteNumber = (value?: number | null): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

export const getSafeImageDimensions = ({
  height,
  width,
}: ImageDimensionInput = {}): SafeImageDimensions => {
  if (isPositiveFiniteNumber(height) && isPositiveFiniteNumber(width)) {
    return { height, width };
  }

  return FALLBACK_PREVIEW_IMAGE_DIMENSIONS;
};
