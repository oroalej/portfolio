import { FaGlobeAsia } from "react-icons/fa";
import { BaseSkeletonLoader, CardRoot } from "@/components";
import { FaCode, FaFigma } from "react-icons/fa6";

interface ProjectCardLoadingProps {
  sortable?: boolean;
}

const ProjectCardLoading = ({ sortable }: ProjectCardLoadingProps) => (
  <CardRoot rounded className="mb-2">
    <div className="flex flex-row">
      <div className="px-4 py-3.5 w-56">
        <BaseSkeletonLoader className="rounded aspect-video" />
      </div>
      <div className="px-4 py-3.5 flex-1">
        <div className="flex justify-start items-start gap-2 mb-1">
          <BaseSkeletonLoader
            className="rounded w-1/4"
            style={{ height: "32px" }}
          />

          {!sortable && (
            <BaseSkeletonLoader
              className="rounded w-1/4"
              style={{ height: "28px", width: "80px" }}
            />
          )}
        </div>

        <BaseSkeletonLoader
          className="rounded w-full mb-0.5"
          style={{ height: "20px" }}
        />
        <BaseSkeletonLoader
          className="rounded w-full mb-0.5"
          style={{ height: "20px" }}
        />
        <BaseSkeletonLoader
          className="rounded w-1/4 mb-0.5"
          style={{ height: "20px" }}
        />
      </div>
      <div className="px-4 py-3.5 w-80">
        <table>
          <tbody>
            <tr>
              <td className="align-middle pl-0 pr-1.5 py-1">
                <FaGlobeAsia />
              </td>
              <td className="pl-1.5 pr-0 py-1 w-full">
                <BaseSkeletonLoader
                  className="rounded"
                  style={{ height: "20px" }}
                />
              </td>
            </tr>

            <tr>
              <td className="align-middle pl-0 pr-1.5 py-1">
                <FaCode />
              </td>
              <td className="pl-1.5 pr-0 py-1 w-full">
                <BaseSkeletonLoader
                  className="rounded"
                  style={{ height: "20px" }}
                />
              </td>
            </tr>

            <tr>
              <td className="align-middle pl-0 pr-1.5 py-1">
                <FaFigma />
              </td>
              <td className="pl-1.5 pr-0 py-1">
                <BaseSkeletonLoader
                  className="rounded"
                  style={{ height: "20px" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3.5 w-72">
        <div className="flex flex-row flex-wrap gap-1">
          {[...Array(2)].map((_, index) => (
            <BaseSkeletonLoader
              key={`skill-${index}`}
              className="rounded w-12"
              style={{ height: "24px" }}
            />
          ))}
        </div>
      </div>
      <div className="px-4 py-3.5" style={{ width: "116px" }}>
        <div className="flex flex-row gap-2 items-center">
          <BaseSkeletonLoader
            className="rounded w-12"
            style={{ height: "30px", width: "38px" }}
          />

          <BaseSkeletonLoader
            className="rounded w-12"
            style={{ height: "30px", width: "38px" }}
          />
        </div>
      </div>
      <div className="px-4 py-3.5 inline-flex justify-center w-16">
        {sortable && (
          <BaseSkeletonLoader
            className="rounded w-12 h-full"
            style={{ width: "24px" }}
          />
        )}
      </div>
    </div>
  </CardRoot>
);

export default ProjectCardLoading;
