import {Fragment, useState} from "react";
import ProjectImagePreviewDialog from "@/components/ProjectImagePreviewDialog";
import {
  ProjectCard,
  ProjectContent,
  ProjectWithScreenshotsInterface,
  SectionTitle,
  SectionWrapper
} from "@/components/index";
import {PROJECT_LIST} from "@/data/projects";
import {useOpenable} from "@/hooks/index";

export const RESET_PROJECT_STATE: ProjectWithScreenshotsInterface = {
  title: '',
  description: '',
  image: '',
  source: '',
  uses: [],
  screenshots: []
}

export const Projects = () => {
  const {isOpen, onClose, onOpen} = useOpenable();
  const [activeProject, setActiveProject] = useState(RESET_PROJECT_STATE);

  const onImagePreview = (project: ProjectWithScreenshotsInterface) => {
    setActiveProject(project)
    onOpen()
  }

  return (
    <Fragment>
      <SectionWrapper className="bg-neutral-900 text-neutral-300" id="projects">
        <SectionTitle className="text-xl sm:text-2xl md:text-3xl" anchor="#projects">
          Projects
        </SectionTitle>

        <p className="text-sm xs:text-base mb-2 text-opacity-80">
          Whatever makes me interested and curious, I will try to learn it by taking a freelance work using that
          technology or creating my own project just to try it out.
        </p>

        <ProjectContent>
          {
            PROJECT_LIST.map(project => (
              <ProjectCard
                project={project}
                key={project.title}
                onImagePreview={onImagePreview}
              />
            ))
          }
        </ProjectContent>
      </SectionWrapper>

      <ProjectImagePreviewDialog
        project={activeProject}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Fragment>
  )
}
