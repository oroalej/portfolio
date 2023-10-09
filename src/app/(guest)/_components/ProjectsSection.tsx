"use client";

import {Fragment, useState} from "react";
import {ProjectCard, ProjectInterface, ProjectWithScreenshotsInterface} from "@/components/Project";
import {Section} from "@/components";
import {PROJECT_LIST} from "@/data/projects";
import {useOpenable} from "@/hooks";
import {AnimatePresence} from "framer-motion";
import {PropType} from "@/types";
import classNames from "classnames";
import ProjectImagePreviewDialog from "@/app/(guest)/_components/ProjectImagePreviewDialog";
import {kebabCase} from "@/utils";

const ProjectsSection = () => {
    const {isOpen, onClose, onOpen} = useOpenable();
    const [type, setType] = useState<PropType<ProjectInterface, "type">>("freelance");

    const [activeProject, setActiveProject] = useState<ProjectWithScreenshotsInterface>({
        type: "personal",
        title: '',
        description: '',
        image: '',
        source: '',
        uses: [],
        screenshots: []
    });

    const onImagePreview = (project: ProjectWithScreenshotsInterface) => {
        setActiveProject(project)
        onOpen()
    }

    return (
        <Fragment>
            <Section className="bg-neutral-900 text-neutral-300" id="projects">
                <Section.Title className="text-xl sm:text-2xl md:text-3xl" anchor="#projects">
                    Projects
                </Section.Title>

                <p className="text-sm xs:text-base mb-8 text-opacity-80">
                    Whatever makes me interested and curious, I will try to learn it by taking a freelance work using
                    that
                    technology or creating my own project just to try it out.
                </p>

                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => setType("freelance")}
                        className={classNames("hover:bg-neutral-800 active:bg-neutral-800 active:bg-opacity-80 transition-colors px-4 py-2 rounded-md", {
                            "bg-neutral-800": type === 'freelance'
                        })}
                    >
                        Freelancing
                    </button>

                    <button
                        onClick={() => setType("personal")}
                        className={classNames("hover:bg-neutral-800 active:bg-neutral-800 active:bg-opacity-80 transition-colors px-4 py-2 rounded-md", {
                            "bg-neutral-800": type === 'personal'
                        })}
                    >
                        Personal
                    </button>
                </div>

                <Section.Content>
                    <AnimatePresence mode="sync">
                        {PROJECT_LIST
                            .filter(item => item.type === type)
                            .map(project => (
                                <ProjectCard
                                    key={kebabCase(project.title)}
                                    project={project}
                                    onImagePreview={onImagePreview}
                                />
                            ))
                        }
                    </AnimatePresence>
                </Section.Content>
            </Section>

            <ProjectImagePreviewDialog
                project={activeProject}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Fragment>
    )
}

export default ProjectsSection;
