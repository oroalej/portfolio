"use client";

import { DreamFormParams } from "@/features/daydreams/types";
import { DEFAULT_FORM_VALUES } from "@/features/daydreams/data";
import { useCallback } from "react";
import { useStoreDaydreamMutation } from "@/features/daydreams/api";
import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import toast from "react-hot-toast";

const CreateDaydreamWrapper = () => {
  const storeDaydreamMutation = useStoreDaydreamMutation();

  const onSubmitHandler = useCallback(async (value: DreamFormParams) => {
    await toast.promise(storeDaydreamMutation.mutateAsync(value), {
      success: "Your data has been successfully created!",
      loading: "Saving information to daydreams table...",
      error: (error) => error,
    });
  }, []);

  return (
    <DaydreamForm
      title="Create Dream"
      item={DEFAULT_FORM_VALUES}
      onSubmit={onSubmitHandler}
      submitButtonText="Create Dream"
    />
  );
};

export default CreateDaydreamWrapper;
