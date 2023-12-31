"use client";

import ProjectLoading from "@/app/(web)/projects/loading";
import PreviewProjectImageDialog from "@/app/(web)/projects/[projectTypeId]/_components/PreviewProjectImageDialog";
import { useParams } from "next/navigation";
import { useGetProjectList } from "@/features/projects/api/getProjectList";
import { Fragment, useState } from "react";
import { ProjectCard } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectCard";
import { useGalleryContext } from "@/context/GalleryContext";
import { ProjectListSelector } from "@/features/projects/transformers";
import { ProjectCardItem } from "@/app/admin/(modules)/projects/_components/ProjectCard";

const ProjectList = () => {
  const { projectTypeId } = useParams();
  const { setList } = useGalleryContext();
  const [selectedProject, setSelectedProject] =
    useState<ProjectCardItem | null>();

  const { isLoading, data } = useGetProjectList(
    {
      byType: true,
      filter: { project_type_id: projectTypeId as string },
      sort: [
        {
          column: "project_order",
          order: "asc",
        },
      ],
    },
    ProjectListSelector
  );

  const [isOpen, setIsOpen] = useState(false);

  const onPreviewImageHandler = (item: ProjectCardItem) => {
    setIsOpen(true);
    setList(item.screenshots);
    setSelectedProject(item);
  };

  const onClosePreviewImageHandler = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return <ProjectLoading />;
  }

  return (
    <Fragment>
      {data?.length ? (
        <div className="flex flex-col gap-8">
          {data?.map((item) => (
            <ProjectCard
              key={item.id}
              item={item as unknown as ProjectCardItem}
              onPreview={onPreviewImageHandler}
            />
          ))}
        </div>
      ) : (
        <span className="text-center">No Result</span>
      )}

      {isOpen && selectedProject && (
        <PreviewProjectImageDialog
          isOpen={isOpen}
          onClose={onClosePreviewImageHandler}
          title={selectedProject.title}
          design_link={selectedProject.design_link}
          repository_link={selectedProject.repository_link}
          website_link={selectedProject.website_link}
        />
      )}
    </Fragment>
  );
};

export default ProjectList;
