"use client";

import { Fragment, useEffect } from "react";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";
import { useRouter } from "next/navigation";
import ProjectPageLoading from "@/app/(web)/projects/loading";

const RedirectToProjectTypeId = () => {
  const router = useRouter();

  const { data: termList } = useGetTermList();
  const { data, isLoading } = useGetTaxonomyByTermId({
    filter: {
      term_id: termList?.find(
        (item) => item.identifier === TERM_IDENTIFIER.PROJECT_TYPES
      )?.id,
    },
  });

  const taxonomy = data?.find(Boolean);

  useEffect(() => {
    if (taxonomy) router.replace(`/projects/${taxonomy.id}`);
  }, [taxonomy?.id]);

  if (isLoading) {
    return <ProjectPageLoading />;
  }

  return <Fragment />;
};

export default RedirectToProjectTypeId;
