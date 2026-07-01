"use client";

import SupabaseImage from "@/components/Image/SupabaseImage";
import { Fragment } from "react";
import { BaseSkeletonLoader } from "@/components";
import { PiCornersOutLight } from "react-icons/pi";
import type { ProjectCardItem } from "@/features/projects/types";
import { ProjectLinks } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectLinks";

interface ProjectCardInterface {
  item: ProjectCardItem;
  onPreview: (value: ProjectCardItem) => void;
}

export const ProjectCard = ({ item, onPreview }: ProjectCardInterface) => {
  const {
    screenshots,
    title,
    description,
    skills,
    repository_link,
    design_link,
    website_link,
  } = item;

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row gap-6">
        {!!screenshots.length ? (
          <button
            type="button"
            aria-label={`Preview ${title} screenshots`}
            className="relative h-64 md:h-auto md:w-64 md:aspect-square shrink-0 rounded-md overflow-hidden cursor-pointer hover:bg-neutral-800 group bg-transparent p-0"
            onClick={() => onPreview(item)}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 z-10 h-full w-full opacity-0 group-hover:opacity-20 transition-opacity delay-75 bg-neutral-800 flex items-center justify-center pointer-events-none group-active:bg-opacity-[0.45]"
            >
              <PiCornersOutLight size={32} className="text-white" />
            </span>

            {screenshots.length > 1 && (
              <span className="absolute right-2 top-2 z-20 rounded-md bg-neutral-900/80 px-2 py-1 text-xs font-medium text-white">
                {screenshots.length} images
              </span>
            )}

            <SupabaseImage
              src={screenshots[0].storage_file_path}
              alt={screenshots[0].name}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover object-center"
              quality={75}
              width={450}
              height={450}
              style={{ width: "100%", height: "100%" }}
              sizes="16rem"
            />
          </button>
        ) : (
          <span className="h-64 md:h-auto md:w-64 md:aspect-square shrink-0 bg-neutral-300 rounded-md" />
        )}
        <div>
          <div className="flex flex-row gap-4 items-start">
            <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-200 mb-2">
              {title}
            </h2>
            <ProjectLinks
              className="flex flex-row gap-3 items-center"
              design_link={design_link}
              repository_link={repository_link}
              website_link={website_link}
            />
          </div>

          <p className="text-neutral-600 dark:text-neutral-200 mb-4">
            {description}
          </p>

          <div className="flex flex-row gap-2.5 text-neutral-700 items-center flex-wrap">
            {skills.map((item) => (
              <div
                key={item.id}
                className="text-sm select-all bg-neutral-200 rounded px-2.5 py-1.5 whitespace-nowrap"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const ProjectCardLoading = () => (
  <div className="flex flex-row gap-6">
    <BaseSkeletonLoader className="rounded-md w-64 aspect-square shrink-0" />

    <div className="flex-1">
      <BaseSkeletonLoader
        className="rounded-md w-1/3 mb-4"
        style={{ height: "28px" }}
      />

      <div className="flex flex-col gap-1.5 flex-1 mb-3.5">
        <BaseSkeletonLoader className="rounded-md" style={{ height: "23px" }} />
        <BaseSkeletonLoader className="rounded-md" style={{ height: "23px" }} />
        <BaseSkeletonLoader
          className="rounded-md w-1/2"
          style={{ height: "23px" }}
        />
      </div>

      <div className="flex flex-row gap-2.5 text-neutral-700 items-center">
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ width: "70px", height: "32px" }}
        />
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ width: "70px", height: "32px" }}
        />
      </div>
    </div>
  </div>
);
