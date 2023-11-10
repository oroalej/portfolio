"use client";

import DaydreamForm from "@/app/admin/daydreams/_components/DaydreamForm";
import { CreateDreamFormInterface } from "@/features/daydreams/types";
import {
  ACCEPTED_IMAGE_TYPES,
  DEFAULT_FORM_VALUES,
  MAX_FILE_SIZE,
} from "@/features/daydreams/data";
import { useRouter } from "next/navigation";
import { any, number, object, string, ZodType } from "zod";
import { parseInt } from "lodash";
import { Fragment, useCallback, useState } from "react";
import { AlertDialog } from "@/components";
import { useOpenable } from "@/hooks";
import { useStoreDaydreamMutation } from "@/features/daydreams/api";

export const createDreamSchema = object({
  shutter_speed: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The shutter speed field is required."
  ),
  aperture: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The aperture field is required."
  ),
  iso: any().refine(
    (item) => !isNaN(parseInt(item)),
    "The iso field is required."
  ),
  year: number(),
  description: string().trim().min(1, "The description field is required."),
  image: object({
    file: (any() as ZodType<FileList>)
      .refine((files) => files?.length === 1, "The image field is required.")
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Invalid file type. File type .jpg, .jpeg, .png and .webp files only are accepted."
      )
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `You're file is too large, max file size is 15MB.`
      ),
    width: number(),
    height: number(),
    name: string().trim(),
    type: string().trim(),
    size: number(),
  }),
});

const CreateDaydreamWrapper = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useOpenable();

  const [daydreamId, setDaydreamId] = useState<string | null>(null);

  const storeDaydreamMutation = useStoreDaydreamMutation();

  const onSubmitHandler = useCallback(
    async (value: CreateDreamFormInterface) => {
      const data = await storeDaydreamMutation.mutateAsync(value);

      setDaydreamId(data.id);
      onOpen();
    },
    []
  );

  const onAlertConfirmHandler = () => {
    setDaydreamId(null);
    onClose();
  };

  const onAlertCancelHandler = () => {
    if (!!daydreamId) {
      router.push(`/admin/daydreams/${daydreamId}`);
    }
  };

  return (
    <Fragment>
      <DaydreamForm
        item={DEFAULT_FORM_VALUES}
        onSubmit={onSubmitHandler}
        defaultImage={""}
        schema={createDreamSchema}
        title={`Create Daydream`}
      />

      {daydreamId && (
        <AlertDialog
          title="Do you want to create another dream?"
          cancelButtonText="No"
          isOpen={isOpen}
          onConfirm={onAlertConfirmHandler}
          onClose={onAlertCancelHandler}
        />
      )}
    </Fragment>
  );
};

export default CreateDaydreamWrapper;
