import {FC} from "react";
import {ExternalLink, ProjectTitle} from "@/components/index";
import {Code, CornersOut, GlobeHemisphereEast} from "phosphor-react";
import styles from "@/components/Project/ProjectCard.module.css";
import Image from "next/image";

export interface ScreenshotInterface {
  title: string;
  filename: string;
  width: number;
  height: number;
}

export interface ProjectWithoutScreenshotsInterface {
  title: string;
  description: string;
  uses: Array<string>;
  source?: string | undefined;
  site?: string | undefined;
  screenshots?: never;
  image?: never;
}

export interface ProjectWithScreenshotsInterface {
  title: string;
  description: string;
  uses: Array<string>;
  source?: string | undefined;
  site?: string | undefined;
  screenshots: Array<ScreenshotInterface>;
  image: string;
}

export type ProjectInterface = ProjectWithoutScreenshotsInterface | ProjectWithScreenshotsInterface

export interface ProjectCardInterface {
  project: ProjectInterface,
  onImagePreview: (project: ProjectWithScreenshotsInterface) => void
}

export const ProjectCard: FC<ProjectCardInterface> = (props: ProjectCardInterface) => {
  const {project, onImagePreview} = props;
  const {title, description, uses, source, site, image = null, screenshots = null} = project;

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-neutral-300">
      {
        (image && screenshots) && (
          <div
            className="relative aspect-video sm:aspect-square overflow-hidden w-full sm:w-48 md:w-52 cursor-pointer group"
            onClick={() => onImagePreview(project as ProjectWithScreenshotsInterface)}
          >
            <Image
              src={`/images/projects/${image}`}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform transform duration-[1000ms]"
            />

            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-500 absolute w-full h-full bg-opacity-40 bg-black flex items-center justify-center pointer-events-none group-active:bg-opacity-[0.45]">
              <CornersOut size={32} weight="bold" className="text-white"/>
            </button>
          </div>
        )
      }

      <div className="flex-1">
        <div className="flex flex-row items-start gap-3">
          <ProjectTitle>{title}</ProjectTitle>
          {
            source && (
              <ExternalLink href={source} label="Code" className={styles.external_link}>
                <Code weight="light"/>
              </ExternalLink>
            )
          }

          {
            site && (
              <ExternalLink href={site} label="Link" className={styles.external_link}>
                <GlobeHemisphereEast weight="light"/>
              </ExternalLink>
            )
          }
        </div>

        <p className="text-sm sm:text-base">{description}</p>

        <div className="flex flex-row flex-wrap gap-2 mt-4">
          {
            uses.map(item => (
              <span className="text-xs sm:text-sm px-3 py-2 bg-black select-all" key={`${item}-${title}`}>{item}</span>
            ))
          }
        </div>
      </div>
    </div>
  )
}
