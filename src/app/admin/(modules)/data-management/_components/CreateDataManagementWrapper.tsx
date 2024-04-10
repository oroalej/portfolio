"use client";

import { DataManagementForm } from "@/app/admin/(modules)/data-management/_components/DataManagementForm";
import {
  TaxonomyFormData,
  useStoreTaxonomyMutation,
} from "@/features/term_taxonomy/api/createTaxonomy";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { TAXONOMY_WITH_PARENT_QUERY } from "@/features/term_taxonomy/data";
import { TaxonomyWithParentAPIDataStructure } from "@/features/term_taxonomy/types";

export const CreateDataManagementWrapper = () => {
  const storeTaxonomyMutation =
    useStoreTaxonomyMutation<TaxonomyWithParentAPIDataStructure>();

  const onSubmitHandler = useCallback(async (value: TaxonomyFormData) => {
    await toast.promise(
      storeTaxonomyMutation.mutateAsync({
        formData: value,
        select: TAXONOMY_WITH_PARENT_QUERY,
      }),
      {
        success: "Data has been successfully created!",
        loading: "Creating taxonomy...",
        error: (error) => error,
      }
    );
  }, []);

  return <DataManagementForm onSubmit={onSubmitHandler} />;
};
