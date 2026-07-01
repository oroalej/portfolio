import classNames from "classnames";
import { ExternalLink } from "@/components";
import type { ProjectCardItem } from "@/features/projects/types";
import {
  PiCode,
  PiFigmaLogoLight,
  PiGlobeHemisphereWestThin,
} from "react-icons/pi";

interface ProjectLinksProps
  extends Pick<
    ProjectCardItem,
    "repository_link" | "website_link" | "design_link"
  > {
  className?: string;
}

const PROJECT_LINK_CLASS_NAME =
  "transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200";

export const ProjectLinks = ({
  className,
  design_link,
  repository_link,
  website_link,
}: ProjectLinksProps) => {
  if (!repository_link && !website_link && !design_link) return null;

  return (
    <div className={classNames(className)}>
      {repository_link && (
        <ExternalLink
          href={`https://github.com/${repository_link}`}
          label="Code"
          className={PROJECT_LINK_CLASS_NAME}
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
          className={PROJECT_LINK_CLASS_NAME}
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
          className={PROJECT_LINK_CLASS_NAME}
          data-tooltip-id="guest-tooltip"
          data-tooltip-content="Design"
          data-tooltip-place="bottom"
        >
          <PiFigmaLogoLight size={22} />
        </ExternalLink>
      )}
    </div>
  );
};
