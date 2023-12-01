"use client";

import { CardBody, CardRoot } from "@/components";
import { MdOutlineDragIndicator } from "react-icons/md";
import {
  GetProjectListParams,
  useGetProjectList,
} from "@/features/projects/api/getProjectList";
import { useQueryState } from "next-usequerystate";
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
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { find, pick } from "lodash";
import { Fragment, Suspense, useCallback, useEffect, useState } from "react";
import { useId } from "@radix-ui/react-id";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  ReorderProjectItem,
  useReorderProjectsMutation,
} from "@/features/projects/api/reorderProjects";
import { useQueryClient } from "@tanstack/react-query";
import { GalleryProvider } from "@/context/GalleryContext";
import {
  ProjectCard,
  ProjectCardItem,
} from "@/app/admin/projects/_components/ProjectCard";
import { ProjectListSelector } from "@/features/projects/transformers";
import ProjectCardLoading from "@/app/admin/projects/_components/Loading/ProjectCardLoading";

const IndexProjectListWrapper = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const reorderProjectsMutation = useReorderProjectsMutation();

  const [type] = useQueryState("type");
  const [q] = useQueryState("q");
  const [draggedItem, setDraggedItem] = useState<ProjectCardItem | null>(null);
  const [localData, setLocalData] = useState<ProjectCardItem[]>([]);

  const typeParamExists = !!type;

  const params: GetProjectListParams = {
    filter: { project_type_id: type ?? undefined },
    q: q ?? undefined,
    sort: [{ column: "project_order", order: "asc" }],
  };
  const { data, isLoading } = useGetProjectList(params, ProjectListSelector);

  useEffect(() => {
    setLocalData((data as any) ?? []);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStartHandler = (event: DragStartEvent) => {
    const item = find((data as any) ?? [], { id: event.active.id });

    if (item) {
      setDraggedItem(item);
    }
  };

  const onDragEndHandler = ({ active, over }: DragEndEvent): void => {
    if (!localData) return;

    const activeIndex = localData.findIndex((item) => item.id === active.id);
    const overIndex = localData.findIndex((item) => item.id === over?.id);

    if (activeIndex === overIndex) {
      return;
    }

    const newOrder = [...arrayMove(localData, activeIndex, overIndex)];
    const rearrangedProjects: ReorderProjectItem[] = [];
    const [startIndex, endIndex] = [activeIndex, overIndex].sort();

    for (let i = startIndex; i <= endIndex; i++) {
      const order = i + 1;

      rearrangedProjects.push({
        ...pick(newOrder[i], ["id", "title", "description"]),
        project_type_id: newOrder[i].project_type.id,
        project_order: order,
      });

      newOrder[i].project_order = order;
    }

    if (!!rearrangedProjects.length) {
      reorderProjectsMutation.mutate({
        items: rearrangedProjects,
      });
    }

    setLocalData(newOrder);
    setDraggedItem(null);

    queryClient.setQueryData(["projects", params], newOrder);
  };

  const onDeleteHandler = useCallback((id: string) => {}, []);

  return (
    <Fragment>
      <CardRoot rounded className="border-b border-neutral-200 mb-2">
        <div className="flex flex-row text-neutral-700">
          <div className="px-4 py-3.5 w-10"></div>
          <div className="px-4 py-3.5 w-56 font-bold">Screenshots</div>
          <div className="px-4 py-3.5 flex-1 font-bold">Details</div>
          <div className="px-4 py-3.5 w-80 font-bold">Links</div>
          <div className="px-4 py-3.5 w-72 font-bold">Skills</div>
          <div className="px-4 py-3.5 font-bold" style={{ width: "116px" }} />
          <div className="px-4 py-3.5 w-16 text-center">
            {typeParamExists && (
              <button
                className="h-full"
                data-tooltip-id="admin-tooltip"
                data-tooltip-content="rearrange"
                data-tooltip-place="bottom"
              >
                <MdOutlineDragIndicator size={20} />
              </button>
            )}
          </div>
        </div>
      </CardRoot>

      <div className="grid grid-cols-1 gap-2 relative">
        {isLoading ? (
          [...Array(2)].map((_, index) => (
            <ProjectCardLoading
              sortable={typeParamExists}
              key={`project-card-loading-${index}`}
            />
          ))
        ) : !!data?.length ? (
          <GalleryProvider>
            <DndContext
              onDragStart={onDragStartHandler}
              onDragEnd={onDragEndHandler}
              collisionDetection={closestCorners}
              sensors={sensors}
              id={id}
              modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
              {localData?.map((project) => (
                <Suspense
                  fallback={<ProjectCardLoading />}
                  key={`project-${project.id}`}
                >
                  <ProjectCard item={project} sortable={typeParamExists} />
                </Suspense>
              ))}

              <DragOverlay className="w-full">
                {!!draggedItem && (
                  <ProjectCard
                    item={draggedItem}
                    sortable={true}
                    isBeingDragged={true}
                  />
                )}
              </DragOverlay>
            </DndContext>
          </GalleryProvider>
        ) : (
          <CardRoot rounded>
            <CardBody className="text-neutral-700 text-center text-sm">
              No Result
            </CardBody>
          </CardRoot>
        )}
      </div>
    </Fragment>
  );
};

export default IndexProjectListWrapper;
