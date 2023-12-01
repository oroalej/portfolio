"use client";

import {
  useBreadcrumbs as useBreadcrumbsContext,
  useBreadcrumbs,
} from "@/context/BreadcrumbContext";
import { ImHome } from "react-icons/im";
import { IconType } from "react-icons";
import Link from "next/link";
import style from "./Breadcrumb.module.css";
import { Fragment, useEffect } from "react";

export interface Breadcrumb {
  href?: string;
  content: string | IconType;
}

export interface BreadcrumbDataSetter {
  breadcrumbs: Breadcrumb[];
}

export const BreadcrumbList = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <div className="flex flex-row gap-8 items-center">
      <Breadcrumb href={"/admin"} content={ImHome} />

      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb key={`breadcrumb-${index}`} {...breadcrumb} />
      ))}
    </div>
  );
};

export const Breadcrumb = ({ href, content: Content }: Breadcrumb) => {
  const children =
    typeof Content === "function" ? <Content className="text-base" /> : Content;

  if (!!href) {
    return (
      <Link href={`/admin${href}`} className={style["breadcrumb-item"]}>
        {children}
      </Link>
    );
  }

  return (
    <div className="text-neutral-500 cursor-default capitalize text-sm font-medium">
      {children}
    </div>
  );
};

/**
 * Workaround so I can assign breadcrumbs in page.tsx without converting it to Client-Side Rendering (CSR).
 *
 * @param breadcrumbs
 * @constructor
 */
export const BreadcrumbDataSetter = ({ breadcrumbs }: BreadcrumbDataSetter) => {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs]);

  return <Fragment />;
};
