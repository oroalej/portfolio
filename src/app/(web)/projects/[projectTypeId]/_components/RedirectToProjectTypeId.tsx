"use client";

import { useGetTermList } from "@/features/terms/api/getTermList";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import { TERM_IDENTIFIER } from "@/data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProjectListLoading } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectList";

const RedirectToProjectTypeId = () => {
  const router = useRouter();

  const { data: termList } = useGetTermList();
  const { data } = useGetTaxonomyByTermId({
    filter: {
      term_id: termList?.find(
        (item) => item.identifier === TERM_IDENTIFIER.PROJECT_TYPES
      )?.id,
    },
  });

  const taxonomyId = data?.find(Boolean)?.id;

  useEffect(() => {
    if (taxonomyId) router.replace(`/projects/${taxonomyId}`);
  }, [router, taxonomyId]);

  return <ProjectListLoading />;
};

export default RedirectToProjectTypeId;
