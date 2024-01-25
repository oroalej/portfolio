"use client";

import { NavLink } from "@/app/(web)/_components/NavLink/NavLink";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";
import { usePathname } from "next/navigation";
import { BaseSkeletonLoader } from "@/components";
import { useGetTermList } from "@/features/terms/api/getTermList";

export const QuoteNavigation = () => {
  const pathname = usePathname();
  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.QUOTE_CATEGORY
  );
  const { data, isLoading } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  if (isLoading) {
    return <QuoteNavigationLoading />;
  }

  return (
    <div className="flex flex-row justify-end items-center mb-16 gap-5">
      {data?.map((taxonomy) => (
        <NavLink
          href={`/quotes/${taxonomy.id}`}
          key={taxonomy.id}
          active={pathname.endsWith(taxonomy.id)}
        >
          {taxonomy.name}
        </NavLink>
      ))}
    </div>
  );
};

export const QuoteNavigationLoading = () => (
  <div className="flex flex-row justify-end items-center mb-16 gap-5">
    {[...Array(3)].map((_, index) => (
      <BaseSkeletonLoader
        key={`category-button-loading-${index}`}
        className="rounded-md w-20"
        style={{ height: "32px" }}
      />
    ))}
  </div>
);
