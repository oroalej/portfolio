"use client";

import ProjectLoading from "@/app/(web)/(profession)/projects/loading";
import PreviewProjectImageDialog from "@/app/(web)/(profession)/projects/_components/PreviewProjectImageDialog";
import { useParams } from "next/navigation";
import { useGetProjectList } from "@/features/projects/api/getProjectList";
import { Fragment, useState } from "react";
import { ProjectCard } from "@/app/(web)/(profession)/projects/_components/ProjectCard";
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
        data?.map((item) => (
          <ProjectCard
            key={item.id}
            item={item as unknown as ProjectCardItem}
            onPreview={onPreviewImageHandler}
          />
        ))
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
