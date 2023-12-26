"use client";

import { NavLink } from "@/app/(web)/_components/NavLink/NavLink";
import { usePathname } from "next/navigation";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";

const ProjectHeader = () => {
  const pathname = usePathname();

  const { data: termData } = useGetTermByIdentifier(
    TERM_IDENTIFIER.PROJECT_TYPES
  );

  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

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

export default ProjectHeader;
