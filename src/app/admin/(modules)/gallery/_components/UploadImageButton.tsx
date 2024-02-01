"use client";

import { Button } from "@/components";
import { UseGalleryQueryParams } from "@/app/admin/(modules)/gallery/hooks/useGalleryQueryParams";

const UploadImageButton = () => {
  const serialized = UseGalleryQueryParams();

  return (
    <Button size="small" rounded href={`/admin/gallery/create${serialized}`}>
      Upload Image
    </Button>
  );
};

export default UploadImageButton;
