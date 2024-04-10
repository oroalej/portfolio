"use client";

import { usePathname } from "next/navigation";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { NavLink } from "@/app/(web)/_components/NavLink/NavLink";
import { BaseSkeletonLoader } from "@/components";

export const ProjectNavigation = () => {
  const pathname = usePathname();
  const { data: termList, isLoading: isTermLoading } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.PROJECT_TYPES
  );
  const { data, isLoading } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  if (isLoading || isTermLoading) {
    return <ProjectNavigationLoading />;
  }

  return (
    <div className="flex flex-row justify-end items-center mb-16 gap-5">
      {data?.map((taxonomy) => (
        <NavLink
          href={`/projects/${taxonomy.id}`}
          key={taxonomy.id}
          active={pathname.endsWith(taxonomy.id)}
        >
          {taxonomy.name}
        </NavLink>
      ))}
    </div>
  );
};

export const ProjectNavigationLoading = () => (
  <div className="flex flex-row justify-end items-center mb-16 gap-5">
    {[...Array(3)].map((_, index) => (
      <BaseSkeletonLoader
        key={`project-navigation-loading-${index}`}
        className="rounded-md w-20"
        style={{ height: "44px" }}
      />
    ))}
  </div>
);
