"use client";

import { BaseSkeletonLoader, Button, FormErrorMessage } from "@/components";
import {
  DaydreamImageFile,
  DreamFormImage,
} from "@/features/daydreams/types";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegImages, FaTrash } from "react-icons/fa6";
import { MdOutlineDragIndicator } from "react-icons/md";
import { Suspense, useId, useMemo, useState } from "react";
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

interface SortableDaydreamImageItemProps {
  item: DreamFormImage;
  index: number;
  onRemove: (index: number) => void | Promise<void>;
}

const SortableDaydreamImageItem = ({
  item,
  index,
  onRemove,
}: SortableDaydreamImageItemProps) => {
  const file = item.file;
  const {
    attributes,
    isDragging,
    isOver,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.file_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        "flex items-center gap-3 rounded-md border border-neutral-200 p-2 transition-colors",
        isDragging ? "border-dashed bg-neutral-100" : "bg-white",
        {
          "!bg-blue-100": isOver,
        }
      )}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {file?.storage_file_path ? (
          <Suspense fallback={<BaseSkeletonLoader className="h-full w-full" />}>
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
        <p className="text-xs text-neutral-500">Image {index + 1}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="rounded bg-neutral-50 px-0.5 py-1.5 text-neutral-600 transition-colors hover:bg-neutral-200 cursor-pointer"
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Reorder"
          {...listeners}
          {...attributes}
        >
          <MdOutlineDragIndicator size={18} />
        </button>
        <Button
          icon
          rounded
          type="button"
          size="extra-small"
          variant="text"
          color="dark"
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Remove"
          onClick={() => onRemove(index)}
        >
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

const DaydreamImageManager = ({
  error,
  items = [],
  onChange,
}: DaydreamImageManagerProps) => {
  const id = useId();
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const visibleItems = useMemo(() => applyImageOrder(items), [items]);
  const sortableImageIds = useMemo(
    () => visibleItems.map((item) => item.file_id),
    [visibleItems]
  );
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEndHandler = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const activeIndex = items.findIndex((item) => item.file_id === active.id);
    const overIndex = items.findIndex((item) => item.file_id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    void onChange(applyImageOrder(arrayMove(items, activeIndex, overIndex)));
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
          <DndContext
            collisionDetection={closestCorners}
            id={id}
            onDragEnd={onDragEndHandler}
            sensors={sensors}
          >
            <SortableContext
              items={sortableImageIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 gap-2">
                {visibleItems.map((item, index) => (
                  <SortableDaydreamImageItem
                    index={index}
                    item={item}
                    key={item.file_id}
                    onRemove={onRemoveHandler}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
