"use client";

import React, { FC } from "react";
import { ExternalLink, ImageLoadingIndicator } from "../index";
import Image from "next/image";
import {
  PiCode,
  PiCornersOutLight,
  PiFigmaLogoLight,
  PiGlobeHemisphereWestThin,
} from "react-icons/pi";
import { useLoadable } from "@/hooks";
import classNames from "classnames";

export interface ScreenshotInterface {
  title: string;
  filename: string;
  width: number;
  height: number;
}

interface BaseProject {
  title: string;
  description: string;
  uses: Array<string>;
  source?: string | undefined;
  site?: string | undefined;
  design?: string | undefined;
  image?: string;
  type: "personal" | "freelance";
}

export interface ProjectWithoutScreenshotsInterface extends BaseProject {
  screenshots?: never;
}

export interface ProjectWithScreenshotsInterface extends BaseProject {
  screenshots: Array<ScreenshotInterface>;
}

export type ProjectInterface =
  | ProjectWithoutScreenshotsInterface
  | ProjectWithScreenshotsInterface;

export interface ProjectCardInterface {
  project: ProjectInterface;
  onImagePreview: (project: ProjectWithScreenshotsInterface) => void;
}

export const ProjectCard: FC<ProjectCardInterface> = (
  props: ProjectCardInterface
) => {
  const { project, onImagePreview } = props;
  const {
    title,
    description,
    uses,
    source,
    site,
    design,
    image = null,
    screenshots = null,
  } = project;
  const { isLoading, endLoading } = useLoadable(true);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-neutral-300">
      {image && screenshots && (
        <div
          className={classNames(
            "relative aspect-video sm:aspect-square overflow-hidden w-full sm:w-48 md:w-52 group",
            {
              "cursor-pointer": !isLoading,
            }
          )}
          onClick={() =>
            !isLoading &&
            onImagePreview(project as ProjectWithScreenshotsInterface)
          }
        >
          <Image
            src={`/images/projects/${image}`}
            alt={title}
            fill
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="group-hover:scale-105 transition-transform transform duration-500 object-cover w-auto h-auto"
            onLoadingComplete={endLoading}
          />

          {isLoading ? (
            <ImageLoadingIndicator />
          ) : (
            <button className="opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-500 absolute w-full h-full bg-opacity-40 bg-black flex items-center justify-center pointer-events-none group-active:bg-opacity-[0.45]">
              <PiCornersOutLight size={32} className="text-white" />
            </button>
          )}
        </div>
      )}

      <div className="flex-1">
        <div className="flex flex-row items-start gap-3">
          <h3 className="text-lg sm:text-xl block mb-2">{title}</h3>
          {source && (
            <ExternalLink
              href={source}
              label="Code"
              className="hover:text-rose-500 text-xl transform hover:scale-110 cursor-pointer transition-all"
            >
              <PiCode />
            </ExternalLink>
          )}

          {site && (
            <ExternalLink
              href={site}
              label="Link"
              className="hover:text-rose-500 text-xl transform hover:scale-110 cursor-pointer transition-all"
            >
              <PiGlobeHemisphereWestThin />
            </ExternalLink>
          )}

          {design && (
            <ExternalLink
              href={design}
              label="Figma"
              className="hover:text-rose-500 text-xl transform hover:scale-110 cursor-pointer transition-all"
            >
              <PiFigmaLogoLight />
            </ExternalLink>
          )}
        </div>

        <p className="text-sm sm:text-base">{description}</p>

        <div className="flex flex-row flex-wrap gap-2 mt-4">
          {uses.map((item) => (
            <span
              className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-black select-all"
              key={`${item}-${title}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
