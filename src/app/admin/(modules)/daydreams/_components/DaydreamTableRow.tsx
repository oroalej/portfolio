"use client";

import { BaseSkeletonLoader, Button, ImageSkeletonLoader } from "@/components";
import { FaPencilAlt } from "react-icons/fa";
import { FaChevronRight, FaTrash } from "react-icons/fa6";
import { useStoragePublicUrl } from "@/features/files/api";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { Fragment } from "react";
import { useOpenable } from "@/hooks";
import ImagePreviewDialog from "@/components/Image/ImagePreviewDialog";
import SupabaseImage from "@/components/Image/SupabaseImage";
import ExpandImagePreviewPlaceholder from "@/components/Image/ExpandImagePreviewPlaceholder";

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
  const { isOpen, onClose, onOpen } = useOpenable();
  const { data, isLoading } = useStoragePublicUrl(item.file.storage_file_path);

  if (isLoading || !data) {
    return <DaydreamTableRowLoading />;
  }

  return (
    <Fragment>
      <tr>
        <td className="text-center">
          <div
            className="relative aspect-square w-32 h-32 overflow-hidden flex items-center justify-center group"
            onClick={onOpen}
          >
            <SupabaseImage
              src={item.file.storage_file_path}
              alt={item.file.name}
              className="point-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover rounded-md"
              quality={75}
              width={480}
              height={480}
            />

            <ExpandImagePreviewPlaceholder />
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

      {isOpen && (
        <ImagePreviewDialog
          isOpen={isOpen}
          onClose={onClose}
          item={{
            storage_file_path: item.file.storage_file_path,
            name: item.file.name,
            height: item.file.height,
            width: item.file.width,
          }}
        />
      )}
    </Fragment>
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
