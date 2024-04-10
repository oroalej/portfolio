"use client";

import {
  DataManagementForm,
  DataManagementFormLoading,
} from "@/app/admin/(modules)/data-management/_components/DataManagementForm";
import {
  TaxonomyFormData,
  useStoreTaxonomyMutation,
} from "@/features/term_taxonomy/api/createTaxonomy";
import toast from "react-hot-toast";
import { Fragment, useCallback } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/(modules)/_components/Breadcrumbs";
import { useGetTaxonomyById } from "@/features/term_taxonomy/api/getTaxonomyById";
import { useUpdateTaxonomyMutation } from "@/features/term_taxonomy/api/updateTaxonomy";
import { useQueryState } from "next-usequerystate";

interface EditDataManagementWrapper {
  taxonomyId: string;
}

export const EditDataManagementWrapper = ({
  taxonomyId,
}: EditDataManagementWrapper) => {
  const updateTaxonomyMutation = useUpdateTaxonomyMutation();

  const [term] = useQueryState("type", {
    shallow: false,
    defaultValue: "",
  });

  const { data, isLoading } = useGetTaxonomyById(taxonomyId);

  const onSubmitHandler = useCallback(async (value: TaxonomyFormData) => {
    await toast.promise(
      updateTaxonomyMutation.mutateAsync({
        id: taxonomyId,
        formData: value,
      }),
      {
        success: "Data has been successfully updated!",
        loading: "Updating taxonomy...",
        error: (error) => error,
      }
    );
  }, []);

  if (isLoading || !data) {
    return <DataManagementFormLoading />;
  }

  return (
    <Fragment>
      <BreadcrumbDataSetter
        breadcrumbs={[
          { href: `/data-management?type=${term}`, content: "Data Management" },
          { content: data.name },
        ]}
      />

      <DataManagementForm
        title="Update"
        onSubmit={onSubmitHandler}
        submitButtonText="Update"
        item={{
          name: data.name,
          term_id: data.term_id,
          description: data.description || undefined,
          parent_id: data.parent_id || undefined,
        }}
      />
    </Fragment>
  );
};
