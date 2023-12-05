"use client";

import { Breadcrumb } from "src/app/admin/(modules)/_components/Breadcrumbs";
import { createContext, useContext, useState } from "react";
import { BaseComponent } from "@/types";

export interface BreadcrumbContext {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (value: Breadcrumb[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContext>({
  breadcrumbs: [],
  setBreadcrumbs: () => {},
});

export const useBreadcrumbs = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }: BaseComponent) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
