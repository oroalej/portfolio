import { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  label?: string;
}

export type ExternalLinkInterface = ExternalLinkProps;

export const ExternalLink = ({
  children,
  href,
  label,
  rel,
  target = "_blank",
  title,
  ...remaining
}: ExternalLinkProps) => {
  const resolvedLabel = label?.trim();
  const labelAttributes = resolvedLabel
    ? {
        "aria-label": resolvedLabel,
        title: title ?? resolvedLabel,
      }
    : { title };

  return (
    <a
      {...remaining}
      href={href}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      target={target}
      {...labelAttributes}
    >
      {children}
    </a>
  );
};
