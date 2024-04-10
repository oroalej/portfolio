"use client";

import { DataManagementForm } from "@/app/admin/(modules)/data-management/_components/DataManagementForm";
import {
  TaxonomyFormData,
  useStoreTaxonomyMutation,
} from "@/features/term_taxonomy/api/createTaxonomy";
import toast from "react-hot-toast";
import { useCallback } from "react";

export const CreateDataManagementWrapper = () => {
  const storeTaxonomyMutation = useStoreTaxonomyMutation();

  const onSubmitHandler = useCallback(async (value: TaxonomyFormData) => {
    await toast.promise(storeTaxonomyMutation.mutateAsync(value), {
      success: "Data has been successfully created!",
      loading: "Creating taxonomy...",
      error: (error) => error,
    });
  }, []);

  return <DataManagementForm onSubmit={onSubmitHandler} />;
};
