"use client";

import { useBreadcrumbs as useBreadcrumbsContext } from "@/context/BreadcrumbContext";
import { Breadcrumb } from "@/app/admin/_components/Breadcrumbs";
import { useEffect } from "react";

export const useBreadcrumbs = (value: Breadcrumb[]) => {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  useEffect(() => {
    setBreadcrumbs(value);
  }, [value]);
};
