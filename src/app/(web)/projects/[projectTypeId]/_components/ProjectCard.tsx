import SupabaseImage from "@/components/Image/SupabaseImage";
import React, { Fragment } from "react";
import { BaseSkeletonLoader, ExternalLink } from "@/components";
import {
  PiCode,
  PiCornersOutLight,
  PiFigmaLogoLight,
  PiGlobeHemisphereWestThin,
} from "react-icons/pi";
import { ProjectCardItem } from "@/app/admin/(modules)/projects/_components/ProjectCard";

interface ProjectCardInterface {
  item: ProjectCardItem;
  onPreview: (value: ProjectCardItem) => void;
}

export const ProjectCard = ({ item, onPreview }: ProjectCardInterface) => {
  const {
    id,
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
          <div
            className="relative h-64 md:h-auto md:w-64 md:aspect-square shrink-0 rounded-md overflow-hidden cursor-pointer hover:bg-neutral-800 group"
            onClick={() => onPreview(item)}
          >
            <button className="z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-75 absolute w-full h-full bg-opacity-40 bg-neutral-800 flex items-center justify-center pointer-events-none group-active:bg-opacity-[0.45]">
              <PiCornersOutLight size={32} className="text-white" />
            </button>

            {screenshots.length && (
              <div className="flex flex-row gap-1 absolute right-2.5 top-2.5 z-10">
                {[...Array(screenshots.length)].map((_, index) => (
                  <span
                    key={`indicator-${index}-${id}`}
                    className="w-1.5 h-1.5 bg-neutral-600 rounded-full"
                  />
                ))}
              </div>
            )}

            <SupabaseImage
              src={screenshots[0].storage_file_path}
              alt={screenshots[0].name}
              className="object-cover absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full"
              quality={75}
              width={450}
              height={450}
            />
          </div>
        ) : (
          <span className="h-64 md:h-auto md:w-64 md:aspect-square shrink-0 bg-neutral-300 rounded-md" />
        )}
        <div>
          <div className="flex flex-row gap-4 items-start">
            <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-200 mb-2">
              {title}
            </h2>
            <div className="flex flex-row gap-3 items-center">
              {repository_link && (
                <ExternalLink
                  href={`https://github.com/${repository_link}`}
                  label="Code"
                  className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                  data-tooltip-id="guest-tooltip"
                  data-tooltip-content="Code"
                  data-tooltip-place="bottom"
                >
                  <PiCode size={22} />
                </ExternalLink>
              )}

              {website_link && (
                <ExternalLink
                  href={`https://${website_link}`}
                  label="Link"
                  className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                  data-tooltip-id="guest-tooltip"
                  data-tooltip-content="Website"
                  data-tooltip-place="bottom"
                >
                  <PiGlobeHemisphereWestThin size={22} />
                </ExternalLink>
              )}

              {design_link && (
                <ExternalLink
                  href={`https://www.figma.com/file/${design_link}`}
                  label="Figma"
                  className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                  data-tooltip-id="guest-tooltip"
                  data-tooltip-content="Design"
                  data-tooltip-place="bottom"
                >
                  <PiFigmaLogoLight size={22} />
                </ExternalLink>
              )}
            </div>
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
