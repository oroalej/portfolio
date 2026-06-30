"use client";

import { BaseSkeletonLoader, Button, FormErrorMessage } from "@/components";
import {
  DaydreamImageFile,
  DreamFormImage,
} from "@/features/daydreams/types";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegImages,
  FaTrash,
} from "react-icons/fa6";
import { Suspense, useMemo, useState } from "react";
import GalleryDialog from "@/app/admin/(modules)/daydreams/_components/GalleryDialog";
import SupabaseImage from "@/components/Image/SupabaseImage";
import classNames from "classnames";

interface DaydreamImageManagerProps {
  error?: string;
  items: DreamFormImage[];
  onChange: (value: DreamFormImage[]) => void | Promise<void>;
}

const isDaydreamImageFile = (
  file?: Partial<DaydreamImageFile>
): file is DaydreamImageFile =>
  !!file?.id &&
  !!file.bucket_name &&
  !!file.name &&
  !!file.storage_file_path &&
  !!file.type &&
  typeof file.size === "number";

const applyImageOrder = (items: DreamFormImage[]): DreamFormImage[] =>
  items.map((item, index) => ({
    ...item,
    image_order: index + 1,
  }));

const DaydreamImageManager = ({
  error,
  items = [],
  onChange,
}: DaydreamImageManagerProps) => {
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const visibleItems = useMemo(() => applyImageOrder(items), [items]);
  const selectedImages = useMemo(
    () =>
      visibleItems
        .map((item) => item.file)
        .filter(isDaydreamImageFile),
    [visibleItems]
  );

  const onRemoveHandler = async (index: number) => {
    await onChange(
      applyImageOrder(items.filter((_, itemIndex) => itemIndex !== index))
    );
  };

  const onMoveHandler = async (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= items.length) return;

    const updatedItems = [...items];
    const [selectedItem] = updatedItems.splice(index, 1);

    if (!selectedItem) return;

    updatedItems.splice(nextIndex, 0, selectedItem);

    await onChange(applyImageOrder(updatedItems));
  };

  return (
    <div>
      <div
        className={classNames(
          "rounded-md border border-dashed p-3 transition-colors",
          error
            ? "border-red-600 bg-red-50"
            : "border-neutral-200 bg-neutral-50"
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-neutral-600">
            {visibleItems.length} selected
          </span>
          <Button
            rounded
            type="button"
            size="extra-small"
            onClick={() => setIsGalleryDialogOpen(true)}
          >
            Select Images
          </Button>
        </div>

        {visibleItems.length ? (
          <div className="grid grid-cols-1 gap-2">
            {visibleItems.map((item, index) => {
              const file = item.file;

              return (
                <div
                  key={`${item.file_id}-${index}`}
                  className="flex items-center gap-3 rounded-md border border-neutral-200 bg-white p-2"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {file?.storage_file_path ? (
                      <Suspense
                        fallback={
                          <BaseSkeletonLoader className="h-full w-full" />
                        }
                      >
                        <SupabaseImage
                          src={file.storage_file_path}
                          alt={file.name ?? "Daydream image"}
                          className="h-full w-full object-cover"
                          quality={75}
                          width={240}
                          height={240}
                        />
                      </Suspense>
                    ) : (
                      <FaRegImages className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-700">
                      {file?.name ?? item.file_id}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Image {index + 1}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      icon
                      rounded
                      type="button"
                      size="extra-small"
                      variant="text"
                      color="secondary"
                      disabled={index === 0}
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Move up"
                      onClick={() => onMoveHandler(index, -1)}
                    >
                      <FaChevronUp />
                    </Button>
                    <Button
                      icon
                      rounded
                      type="button"
                      size="extra-small"
                      variant="text"
                      color="secondary"
                      disabled={index === visibleItems.length - 1}
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Move down"
                      onClick={() => onMoveHandler(index, 1)}
                    >
                      <FaChevronDown />
                    </Button>
                    <Button
                      icon
                      rounded
                      type="button"
                      size="extra-small"
                      variant="text"
                      color="danger"
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Remove"
                      onClick={() => onRemoveHandler(index)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            type="button"
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-white text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-500"
            onClick={() => setIsGalleryDialogOpen(true)}
          >
            <FaRegImages className="text-2xl" />
            <span className="text-sm">No images selected</span>
          </button>
        )}
      </div>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}

      {isGalleryDialogOpen && (
        <GalleryDialog
          isOpen={isGalleryDialogOpen}
          onClose={() => setIsGalleryDialogOpen(false)}
          selectedImages={selectedImages}
          onSelect={async (value) => {
            const selectedItems = value.map((file, index) => {
              const currentItem = items.find(
                (item) => item.file_id === file.id
              );

              return {
                id: currentItem?.id,
                file_id: file.id,
                file,
                image_order: index + 1,
              };
            });

            setIsGalleryDialogOpen(false);
            await onChange(selectedItems);
          }}
        />
      )}
    </div>
  );
};

export default DaydreamImageManager;
