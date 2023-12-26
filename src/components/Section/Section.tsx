import { Container } from "../index";
import { ReactNode } from "react";
import { FaHashtag } from "react-icons/fa";
import classNames from "classnames";

interface BaseComponent {
  children?: ReactNode;
  className?: string;
}

interface SectionWrapperInterface extends BaseComponent {
  id?: string;
}

interface SectionTitleInterface extends BaseComponent {
  anchor?: string;
}

export const SectionWrapper = ({
  children,
  id,
  className = "",
}: SectionWrapperInterface) => (
  <div className={classNames("py-16 dark:text-neutral-300", className)} id={id}>
    <Container>{children}</Container>
  </div>
);

export const SectionTitle = ({
  children,
  anchor,
  className = "",
}: SectionTitleInterface) => (
  <div
    className={classNames(
      "flex flex-row gap-2 items-center mb-4 text-2xl",
      className
    )}
  >
    <FaHashtag size={24} className="text-rose-500" />

    <a href={anchor} className="cursor-pointer">
      {children}
    </a>
  </div>
);

export const SectionContent = ({ children }: BaseComponent) => (
  <div className="flex flex-col gap-8 md:gap-12 lg:px-8 mt-16">{children}</div>
);
