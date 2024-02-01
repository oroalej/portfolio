"use client";

import Image from "next/image";
import Link from "next/link";
import ShowWrapperLoading from "@/app/admin/(modules)/gallery/[imageId]/_components/Loading/ShowWrapperLoading";
import {
  CardBody,
  CardHeader,
  CardRoot,
  CardTitle,
  ImageSkeletonLoader,
} from "@/components";
import { FaRegImages } from "react-icons/fa6";
import { useFileById } from "@/features/files/api/getFileById";
import { computeStorageSizeFromByte } from "@/utils";
import { useStoragePublicUrl } from "@/features/files/api";
import { PiXBold } from "react-icons/pi";
import { Fragment } from "react";
import { UseGalleryQueryParams } from "@/app/admin/(modules)/gallery/hooks/useGalleryQueryParams";

interface ShowWrapper {
  id: string;
}

const ShowWrapper = ({ id }: ShowWrapper) => {
  const serialized = UseGalleryQueryParams();
  const { data, isLoading } = useFileById(id);
  const { data: imageLink, isLoading: isImageLinkLoading } =
    useStoragePublicUrl(data?.storage_file_path);

  if (isLoading || !data) return <ShowWrapperLoading />;

  return (
    <CardRoot className="w-96 shrink-0" rounded>
      <CardHeader className="pb-0 flex flex-row justify-between items-start">
        <CardTitle icon={<FaRegImages />} className="!items-start">
          {data.name}
        </CardTitle>

        <Link
          href={`/admin/gallery${serialized}`}
          className="rounded-md hover:bg-neutral-100 active:bg-neutral-200/70 transition-colors p-2 text-neutral-700 -mt-1 -mr-1"
        >
          <PiXBold size={22} />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="mb-4 relative aspect-video overflow-hidden rounded-md bg-neutral-100">
          {isImageLinkLoading || !imageLink ? (
            <ImageSkeletonLoader aspectRatio="16/9" />
          ) : (
            <Image
              src={imageLink}
              alt={data.name}
              className="object-contain object-center w-full h-full"
              quality={75}
              width={480}
              height={480}
            />
          )}
        </div>

        {data.category && (
          <Fragment>
            <h3 className="font-medium text-neutral-700 text-base">Category</h3>

            <span className="block mb-3">{data.category?.name || ""}</span>
          </Fragment>
        )}

        <h3 className="mb-3 font-medium text-neutral-700 text-base">
          File Details
        </h3>

        <div className="text-neutral-700 text-sm">
          <div className="mb-3">
            <span className="block font-medium">Bucket Name</span>
            <span className="block">{data.bucket_name}</span>
          </div>

          <div className="mb-3">
            <span className="block font-medium">Type</span>
            <span className="block">{data.type}</span>
          </div>

          <div className="mb-3">
            <span className="block font-medium">Size</span>
            <span className="block">
              {computeStorageSizeFromByte(data.size)}
            </span>
          </div>

          <div className="mb-3">
            <span className="block font-medium">Dimension</span>
            <span className="block">
              {data.width} x {data.height}
            </span>
          </div>

          <div className="mb-3">
            <span className="block font-medium">Created At</span>
            <span className="block">
              {new Date(data.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardBody>
    </CardRoot>
  );
};

export default ShowWrapper;
