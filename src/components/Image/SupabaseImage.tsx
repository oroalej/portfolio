"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useStoragePublicUrl } from "@/features/files/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SupabaseImageProps extends ImageProps {
  src: string;
}

const SupabaseImage = ({
  src,
  alt,
  className,
  ...remaining
}: SupabaseImageProps) => {
  const publicUrlData = useStoragePublicUrl(src);

  if (publicUrlData.isLoading || !publicUrlData.data) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <AiOutlineLoading3Quarters className="animate-spin" size={28} />
      </div>
    );
  }

  return (
    <Image
      src={publicUrlData.data}
      className={className}
      alt={alt}
      {...remaining}
    />
  );
};

export default SupabaseImage;
