import { Button } from "@/components/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { ScreenshotForm } from "@/app/admin/(modules)/projects/_components/ScreenshotDialog";
import { SetRequired } from "@/types";
import { useFileById } from "@/features/files/api/getFileById";
import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";

export interface ScreenshotItemProps {
  item: SetRequired<ScreenshotForm, "id">;
  isActive?: boolean;
  onSelect?: (value: ScreenshotForm) => void;
  onDelete?: (value: string) => void;
}

export const ScreenshotItem = ({
  item,
  isActive,
  onSelect,
  onDelete,
}: ScreenshotItemProps) => {
  const { data } = useFileById(item.file_id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        "inline-flex flex-row items-start justify-between gap-2 p-1.5 transition-colors rounded-md border border-neutral-200 w-full",
        [isDragging ? "border-dashed bg-neutral-100" : "bg-white"],
        {
          "!bg-blue-100": isOver,
          "drop-shadow-xl": isActive,
        }
      )}
    >
      <div className="relative w-28 aspect-video bg-neutral-200 rounded">
        {data && (
          <SupabaseImage
            src={data.storage_file_path}
            alt={data.name}
            width={240}
            height={240}
            quality={75}
            className="rounded pointer-events-none object-center object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex-1 text-sm text-neutral-700">{item.title}</div>
      <div className="inline-flex flex-row gap-2 self-center mr-2">
        <Button
          icon
          rounded
          type="button"
          size="extra-small"
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Edit"
          onClick={() => {
            if (onSelect) onSelect(item);
          }}
        >
          <FaPencilAlt />
        </Button>

        <Button
          icon
          rounded
          type="button"
          size="extra-small"
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Delete"
          onClick={() => {
            if (onDelete) onDelete(item.id as string);
          }}
        >
          <FaTrash />
        </Button>
      </div>

      <button
        className="bg-neutral-50 rounded px-0.5 py-1.5 hover:bg-neutral-200 transition-colors self-center"
        {...listeners}
        {...attributes}
      >
        <MdOutlineDragIndicator size={18} />
      </button>
    </div>
  );
};
