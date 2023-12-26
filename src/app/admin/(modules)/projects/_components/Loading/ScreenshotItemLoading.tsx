import { BaseSkeletonLoader, ImageSkeletonLoader } from "@/components";

export const ScreenshotItemLoading = () => (
  <div className="inline-flex flex-row items-start justify-between gap-2 p-1.5 transition-colors rounded-md border border-neutral-200 w-full">
    <div className="relative w-28 aspect-video rounded overflow-hidden">
      <ImageSkeletonLoader />
    </div>

    <div className="flex-1">
      <BaseSkeletonLoader
        className="rounded flex-1"
        style={{ width: "120px" }}
      />
    </div>
    <div className="inline-flex flex-row gap-2 self-center mr-2">
      <BaseSkeletonLoader
        className="rounded aspect-square"
        style={{ width: "28px" }}
      />

      <BaseSkeletonLoader
        className="rounded aspect-square"
        style={{ width: "28px" }}
      />
    </div>

    <BaseSkeletonLoader
      className="rounded self-center"
      style={{ width: "22px", height: "30px" }}
    />
  </div>
);
