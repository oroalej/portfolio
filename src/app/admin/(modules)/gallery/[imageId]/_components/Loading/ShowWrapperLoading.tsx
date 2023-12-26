import {
  BaseSkeletonLoader,
  CardBody,
  CardHeader,
  CardRoot,
  CardTitle,
  ImageSkeletonLoader,
} from "@/components";
import { FaRegImages } from "react-icons/fa6";

const ShowWrapperLoading = () => (
  <CardRoot className="w-96 shrink-0" rounded>
    <CardHeader className="pb-0">
      <CardTitle icon={<FaRegImages />}>
        <BaseSkeletonLoader
          className="rounded"
          style={{ height: "28px", width: "125px" }}
        />
      </CardTitle>
    </CardHeader>
    <CardBody>
      <div className="relative mb-4 rounded-md overflow-hidden">
        <ImageSkeletonLoader aspectRatio="16/9" />
      </div>

      <h3 className="mb-3 font-medium text-neutral-700 text-base">
        File Details
      </h3>

      <div className="text-neutral-700 text-sm">
        <div className="mb-3">
          <span className="block font-medium">Bucket Name</span>
          <BaseSkeletonLoader
            className="rounded"
            style={{ height: "20px", width: "40%" }}
          />
        </div>

        <div className="mb-3">
          <span className="block font-medium">Type</span>
          <BaseSkeletonLoader
            className="rounded"
            style={{ height: "20px", width: "35%" }}
          />
        </div>

        <div className="mb-3">
          <span className="block font-medium">Size</span>
          <BaseSkeletonLoader
            className="rounded"
            style={{ height: "20px", width: "25%" }}
          />
        </div>

        <div className="mb-3">
          <span className="block font-medium">Dimension</span>
          <BaseSkeletonLoader
            className="rounded"
            style={{ height: "20px", width: "40%" }}
          />
        </div>

        <div className="mb-3">
          <span className="block font-medium">Created At</span>
          <BaseSkeletonLoader
            className="rounded"
            style={{ height: "20px", width: "35%" }}
          />
        </div>
      </div>
    </CardBody>
  </CardRoot>
);

export default ShowWrapperLoading;
