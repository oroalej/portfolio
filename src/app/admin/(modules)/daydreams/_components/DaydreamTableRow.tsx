import Image from "next/image";
import { BaseSkeletonLoader, Button, ImageSkeletonLoader } from "@/components";
import { FaPencilAlt } from "react-icons/fa";
import { FaChevronRight, FaTrash } from "react-icons/fa6";
import { useStoragePublicUrl } from "@/features/files/api";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { Fragment } from "react";

interface DaydreamTableRowProps {
  item: DaydreamAPIDataStructure;
  onClick: (value: DaydreamAPIDataStructure) => void;
  isSelected: boolean;
}

export const DaydreamTableRow = ({
  item,
  onClick,
  isSelected,
}: DaydreamTableRowProps) => {
  const { data, isLoading } = useStoragePublicUrl(item.file.storage_file_path);

  if (isLoading || !data) {
    return <DaydreamTableRowLoading />;
  }

  return (
    <tr>
      <td className="text-center">
        <div className="relative aspect-square w-32 h-32 overflow-hidden flex items-center justify-center">
          <Image
            src={data}
            alt="Something"
            className="object-cover object-center point-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            width={128}
            height={128}
          />
        </div>
      </td>
      <td>{item.year}</td>
      <td>{item.description}</td>
      <td>
        <span className="block mb-1 whitespace-nowrap">{item.iso} ISO</span>
        <span className="block mb-1 whitespace-nowrap">
          {item.shutter_speed} <abbr title="Shutter Speed">SS</abbr>
        </span>
        <span className="block mb-1 whitespace-nowrap">
          {item.aperture} Aperture
        </span>
      </td>
      <td>{new Date(item.created_at).toLocaleDateString()}</td>
      <td>
        <div className="flex flex-row gap-1.5 justify-end">
          {isSelected ? (
            <div className="inline-flex items-center gap-1 font-medium bg-neutral-200 text-neutral-800 px-3 py-2 rounded-md h-[38px] transition-colors">
              <span className="text-sm">Selected</span>
              <FaChevronRight />
            </div>
          ) : (
            <Fragment>
              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Edit"
                href={`/admin/daydreams/${item.id}`}
              >
                <FaPencilAlt />
              </Button>

              <Button
                icon
                rounded
                size="small"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Delete"
                onClick={() => onClick(item)}
              >
                <FaTrash />
              </Button>
            </Fragment>
          )}
        </div>
      </td>
    </tr>
  );
};

export const DaydreamTableRowLoading = () => (
  <tr>
    <td>
      <ImageSkeletonLoader />
    </td>
    <td>
      <BaseSkeletonLoader />
    </td>
    <td>
      <BaseSkeletonLoader />
    </td>
    <td>
      <BaseSkeletonLoader className="mb-1.5" />
      <BaseSkeletonLoader className="mb-1.5" />
      <BaseSkeletonLoader className="mb-1.5" />
    </td>
    <td>
      <BaseSkeletonLoader />
    </td>
    <td>
      <div className="flex flex-row gap-1.5 justify-center">
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ width: "38px", height: "38px" }}
        />
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ width: "38px", height: "38px" }}
        />
      </div>
    </td>
  </tr>
);
