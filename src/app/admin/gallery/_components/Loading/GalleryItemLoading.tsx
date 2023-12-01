import { BaseSkeletonLoader, ImageSkeletonLoader } from "@/components";
import { BsThreeDotsVertical } from "react-icons/bs";

const GalleryItemLoading = () => (
  <div className="bg-blue-50 p-2.5 rounded-md hover:bg-neutral-100 transition-colors w-60">
    <div className="flex justify-between items-center mb-2.5 gap-6">
      <BaseSkeletonLoader className="w-1/2 h-[20px] rounded-md" />

      <button className="cursor-pointer outline-none">
        <BsThreeDotsVertical />
      </button>
    </div>

    <div className="relative aspect-square overflow-hidden cursor-pointer rounded-md">
      <ImageSkeletonLoader />
    </div>
  </div>
);

export default GalleryItemLoading;
