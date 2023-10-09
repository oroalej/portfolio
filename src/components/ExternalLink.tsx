"use client";

import {FC, ReactNode} from "react";

interface ExternalLinkInterface {
  children: ReactNode,
  href: string,
  label?: string | undefined,
  className?: string | undefined
}

const ExternalLink: FC<ExternalLinkInterface> = (props: ExternalLinkInterface) => {
  const {children, href, label = "", className = ""} = props;

  return (
    <a href={href} rel="noreferrer" target="_blank" aria-label={label} title={label} className={className}>
      {children}
    </a>
  )
}

export default ExternalLink;
