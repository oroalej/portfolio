import { ScreenshotItem as ScreenshotItemUI } from "@/app/admin/projects/_components/ScreenshotItem";
import { Button, Scrollbar } from "@/components";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { find } from "lodash";
import {
  DEFAULT_SCREENSHOT_FORM_VALUES,
  ScreenshotDialog,
  ScreenshotForm,
} from "@/app/admin/projects/_components/ScreenshotDialog";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useId } from "@radix-ui/react-id";
import { SetRequired } from "@/types";
import * as UIScrollArea from "@radix-ui/react-scroll-area";

export interface ScreenshotWrapper {
  items: ScreenshotForm[];
  onChange: (value: ScreenshotForm[]) => void;
}

export const ScreenshotWrapper = ({
  items = [],
  onChange,
}: ScreenshotWrapper) => {
  const id = useId();

  const [isScreenshotDialogOpen, setIsScreenshotDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<ScreenshotForm | null>(null);
  const [selectedItem, setSelectedItem] = useState<ScreenshotForm>({
    ...DEFAULT_SCREENSHOT_FORM_VALUES,
  });

  const fileIds = useMemo(() => items.map((item) => item.file_id), [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStartHandler = (event: DragStartEvent) => {
    const item = find(items, { id: event.active.id });

    if (item) {
      setDraggedItem(item as ScreenshotForm);
    }
  };

  const onDragEndHandler = ({ active, over }: DragEndEvent) => {
    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over?.id);

    if (activeIndex !== overIndex) {
      onChange([...arrayMove(items, activeIndex, overIndex)]);
    }

    setDraggedItem(null);
  };

  const onScreenshotSubmitHandler = (value: ScreenshotForm) => {
    const screenshotIndex = items.findIndex((item) => item.id === value.id);

    if (screenshotIndex === -1) onChange([...items, value]);
    else {
      onChange(
        items.map((item, index) => (index === screenshotIndex ? value : item))
      );
    }
  };

  const onDeleteItemHandler = (id: string) => {
    const selectedIndex = items.findIndex((item) => item.id === id);
    let updatedList = [...items];

    if (updatedList[selectedIndex].is_created) {
      updatedList = updatedList.filter((item) => item.id !== id);
    } else updatedList[selectedIndex].is_deleted = true;

    onChange(updatedList);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-2">
        <h3 className="text-base font-bold text-neutral-600 mb-3">
          {"Screenshots: "}
        </h3>

        <Button
          rounded
          type="button"
          size="extra-small"
          onClick={() => {
            setIsScreenshotDialogOpen(true);
            setSelectedItem({ ...DEFAULT_SCREENSHOT_FORM_VALUES });
          }}
        >
          Add Screenshot
        </Button>
      </div>

      <UIScrollArea.Root type="auto" className="-mr-3.5">
        <UIScrollArea.Viewport
          className="mr-3.5"
          style={{ maxHeight: "calc(100vh - 288.75px)" }}
        >
          <div className="grid grid-cols-1 gap-1.5 relative">
            <DndContext
              onDragStart={onDragStartHandler}
              onDragEnd={onDragEndHandler}
              collisionDetection={closestCorners}
              sensors={sensors}
              id={id}
            >
              {items
                .filter((item) => !item?.is_deleted)
                .map((item) => (
                  <ScreenshotItemUI
                    item={item as SetRequired<ScreenshotForm, "id">}
                    key={item.id}
                    onSelect={() => {
                      setSelectedItem(item);
                      setIsScreenshotDialogOpen(true);
                    }}
                    onDelete={onDeleteItemHandler}
                  />
                ))}

              {items.length < 5 && (
                <div
                  className="rounded-md border border-dashed border-neutral-300"
                  style={{ height: "77px" }}
                />
              )}

              <DragOverlay className="w-full ">
                {!!draggedItem && (
                  <ScreenshotItemUI
                    isActive={true}
                    item={draggedItem as Required<ScreenshotForm>}
                    key={`overlay-${draggedItem.id}`}
                  />
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </UIScrollArea.Viewport>
        <Scrollbar />
      </UIScrollArea.Root>

      {isScreenshotDialogOpen && (
        <ScreenshotDialog
          excluded={fileIds}
          item={selectedItem}
          onSubmit={onScreenshotSubmitHandler}
          isOpen={isScreenshotDialogOpen}
          onClose={() => setIsScreenshotDialogOpen(false)}
        />
      )}
    </div>
  );
};
