import { FaGlobeAsia, FaPencilAlt } from "react-icons/fa";
import { AlertDialog, Button, CardRoot, ExternalLink } from "@/components";
import { FaCode, FaFigma, FaTrash } from "react-icons/fa6";
import { MdOutlineDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { AiOutlineExpand } from "react-icons/ai";
import { useDeleteProjectMutation } from "@/features/projects/api/deleteProject";
import { useQueryClient } from "@tanstack/react-query";
import { GalleryItem, useGalleryContext } from "@/context/GalleryContext";
import { Tables } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { Fragment, useState } from "react";
import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";
import ImagePreviewDialog from "@/app/admin/(modules)/projects/_components/ImagePreviewDialog";
import toast from "react-hot-toast";

export interface ProjectCardProps {
  item: ProjectCardItem;
  sortable?: boolean;
  isBeingDragged?: boolean;
}
export interface ProjectCardItem
  extends Omit<Tables<"projects">, "created_at" | "project_type_id"> {
  skills: Pick<Tables<"term_taxonomy">, "id" | "name">[];
  project_type: Pick<Tables<"term_taxonomy">, "name" | "id">;
  screenshots: GalleryItem[];
}

export const ProjectCard = ({
  item,
  sortable,
  isBeingDragged,
}: ProjectCardProps) => {
  const deleteProjectMutation = useDeleteProjectMutation();
  const queryClient = useQueryClient();

  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const { setList, setSelectedIndex } = useGalleryContext();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const onPreviewHandler = () => {
    setList(item.screenshots);
    setSelectedIndex(0);
    setIsImagePreviewOpen(true);
  };

  const onDeleteHandler = async () => {
    const title = item.title;

    await toast.promise(
      deleteProjectMutation.mutateAsync(item.id, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["projects"],
            exact: false,
            type: "active",
          });

          setIsImagePreviewOpen(false);
        },
      }),
      {
        success: `Project "${title}" successfully deleted!`,
        loading: "Deleting project...",
        error: (error) => error,
      }
    );
  };

  return (
    <Fragment>
      <CardRoot
        rounded
        ref={setNodeRef}
        style={style}
        className={classNames(
          [isDragging ? "border-dashed bg-neutral-100" : "bg-white"],
          {
            "!bg-blue-100": isOver,
            "drop-shadow-xl": isBeingDragged,
          }
        )}
      >
        <div className="flex flex-row">
          <div className="px-4 py-3.5 w-10 font-medium">
            {item.project_order}
          </div>
          <div className="px-4 py-3.5 w-56 overflow-hidden">
            {!!item.screenshots?.length ? (
              <div
                className="relative aspect-video w-full h-full group bg-neutral-300 rounded-md"
                onClick={onPreviewHandler}
                style={{ minHeight: "120px" }}
              >
                <SupabaseImage
                  src={item.screenshots[0].storage_file_path}
                  alt={item.screenshots[0].name}
                  width={240}
                  height={240}
                  quality={75}
                  className="pointer-events-none object-center object-cover w-full h-full rounded-md"
                />

                <div className="absolute inset-0 inline-flex items-center justify-center group-hover:opacity-100 transition-all duration-500 opacity-0 cursor-pointer bg-black bg-opacity-40 group-active:bg-opacity-50 rounded-md">
                  <button className="text-neutral-200 outline-none">
                    <AiOutlineExpand size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <span
                className="block aspect-video h-full bg-neutral-300 w-full rounded-md"
                style={{ minHeight: "120px" }}
              />
            )}
          </div>
          <div className="px-4 py-3.5 flex-1">
            <div className="flex justify-start items-start gap-2">
              <span className="block text-lg font-medium mb-1 text-neutral-700">
                {item.title}
              </span>
              {!sortable && (
                <span className="text-sm px-2 py-1 rounded bg-neutral-100">
                  {item.project_type.name}
                </span>
              )}
            </div>
            <div className="block text-sm text-neutral-700">
              {item.description}
            </div>
          </div>
          <div className="px-4 py-3.5 w-80">
            <table>
              <tbody>
                {!!item.website_link && (
                  <tr>
                    <td
                      className="align-middle pl-0 pr-1.5 py-1"
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Website Link"
                    >
                      <FaGlobeAsia />
                    </td>
                    <td className="pl-1.5 pr-0 py-1 w-full">
                      <ExternalLink
                        label={`https://${item.website_link}`}
                        href={`https://${item.website_link}`}
                        className="block hover:text-blue-700 w-fit text-neutral-700"
                      >
                        <span className="block whitespace-nowrap text-ellipsis overflow-hidden max-w-[16rem] w-fit">
                          {item.website_link}
                        </span>
                      </ExternalLink>
                    </td>
                  </tr>
                )}

                {!!item.repository_link && (
                  <tr>
                    <td
                      className="align-middle pl-0 pr-1.5 py-1"
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Repository Link"
                    >
                      <FaCode />
                    </td>
                    <td className="pl-1.5 pr-0 py-1 w-full">
                      <ExternalLink
                        label={`https://github.com/${item.repository_link}`}
                        href={`https://github.com/${item.repository_link}`}
                        className="block hover:text-blue-700 w-fit text-neutral-700"
                      >
                        <span className="block whitespace-nowrap text-ellipsis overflow-hidden max-w-[16rem] w-fit">
                          {item.repository_link}
                        </span>
                      </ExternalLink>
                    </td>
                  </tr>
                )}

                {!!item.design_link && (
                  <tr>
                    <td
                      className="align-middle pl-0 pr-1.5 py-1"
                      data-tooltip-id="admin-tooltip"
                      data-tooltip-content="Design Link"
                    >
                      <FaFigma />
                    </td>
                    <td className="pl-1.5 pr-0 py-1">
                      <ExternalLink
                        label={`https://www.figma.com/file/${item.design_link}`}
                        href={`https://www.figma.com/file/${item.design_link}`}
                        className="block hover:text-blue-700 w-fit text-neutral-700"
                      >
                        <span className="block whitespace-nowrap text-ellipsis overflow-hidden max-w-[16rem] w-fit">
                          {item.design_link}
                        </span>
                      </ExternalLink>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3.5 w-72">
            <div className="flex flex-row flex-wrap gap-1">
              {item.skills.map((item) => (
                <span
                  key={item.id}
                  className="bg-neutral-800 text-white text-xs px-2 py-1 rounded"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 py-3.5" style={{ width: "116px" }}>
            <div className="flex flex-row gap-2 items-center">
              <Button
                size="small"
                rounded
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Edit"
                href={`/admin/projects/${item.id}`}
              >
                <FaPencilAlt />
              </Button>

              <Button
                size="small"
                rounded
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="Delete"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
          <div className="px-4 py-3.5 text-center w-16">
            {sortable && (
              <button
                className="bg-neutral-100 rounded px-0.5 py-1.5 hover:bg-neutral-200 transition-colors self-center h-full"
                {...listeners}
                {...attributes}
              >
                <MdOutlineDragIndicator size={20} />
              </button>
            )}
          </div>
        </div>
      </CardRoot>

      {isImagePreviewOpen && (
        <ImagePreviewDialog
          isOpen={isImagePreviewOpen}
          onClose={() => {
            setIsImagePreviewOpen(false);
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <AlertDialog
          onConfirm={onDeleteHandler}
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          title={`Delete "${item.title}" project`}
          confirmButtonText="Yes, delete"
          confirmButtonColor="danger"
          isLoading={deleteProjectMutation.isPending}
        >
          Are you sure you want to delete this project?
        </AlertDialog>
      )}
    </Fragment>
  );
};
