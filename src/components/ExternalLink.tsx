import { FC, ReactNode } from "react";

interface ExternalLinkInterface {
  children: ReactNode;
  href: string;
  label?: string | undefined;
  className?: string | undefined;
}

export const ExternalLink: FC<ExternalLinkInterface> = (
  props: ExternalLinkInterface
) => {
  const { children, href, label = "", className = "", ...remaining } = props;

  return (
    <a
      {...remaining}
      href={href}
      rel="noreferrer"
      target="_blank"
      aria-label={label}
      title={label}
      className={className}
    >
      {children}
    </a>
  );
};
