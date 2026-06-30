"use client";

import {
  Button,
  Card,
  FormGroup,
  Label,
  SearchableSelect,
  SingleSimpleSelect,
  Textarea,
} from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  APERTURE,
  DEFAULT_FORM_VALUES,
  ISO,
  SHUTTER_SPEED,
  YEARS,
} from "@/features/daydreams/data";
import { FormEvent, Fragment, useEffect, useMemo } from "react";
import { isEmpty } from "lodash";
import { SelectDataFormatter } from "@/utils";
import { DreamFormParams } from "@/features/daydreams/types";
import { any, array, number, object, string } from "zod";
import DaydreamImageManager from "@/app/admin/(modules)/daydreams/_components/DaydreamImageManager";

export const DreamSchema = object({
  shutter_speed: number().nullable(),
  aperture: number().nullable(),
  iso: number().nullable(),
  year: number(),
  description: string().trim().min(1, "The description field is required."),
  images: array(
    object({
      file: any().optional(),
      file_id: string().trim().min(1, "Image is required."),
      id: string().optional(),
      image_order: number().optional(),
    })
  ).min(1, "At least one image is required."),
});

interface DaydreamFormComponentProps {
  title: string;
  item?: DreamFormParams;
  onSubmit: (value: DreamFormParams) => Promise<void>;
  onDelete?: () => void;
  submitButtonText?: string;
}

const DaydreamForm = ({
  title,
  item = DEFAULT_FORM_VALUES,
  onSubmit,
  onDelete,
  submitButtonText = "Submit",
}: DaydreamFormComponentProps) => {
  const { handleSubmit, formState, control, getValues, reset, trigger } =
    useForm<DreamFormParams>({
      mode: "onChange",
      defaultValues: useMemo(() => item, [item]),
      resolver: zodResolver(DreamSchema),
    });

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    onResetFormHandler();
  };

  const onResetFormHandler = () => {
    reset(item);
  };

  return (
    <Fragment>
      <form
        method="post"
        onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
        className="max-w-lg w-full sticky top-2"
      >
        <fieldset
          className="disabled:opacity-95"
          disabled={formState.isSubmitting}
        >
          <Card rounded>
            <Card.Header className="pb-0">
              <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
              <h3 className="text-base font-bold text-neutral-600 mb-3">
                {"Photos: "}
              </h3>

              <Controller
                name="images"
                control={control}
                rules={{ required: true }}
                defaultValue={DEFAULT_FORM_VALUES.images}
                render={({ field: { onChange, value }, fieldState }) => (
                  <DaydreamImageManager
                    items={value}
                    error={fieldState.error?.message}
                    onChange={async (value) => {
                      onChange(value);
                      await trigger("images");
                    }}
                  />
                )}
              />

              <div className="mt-3">
                <h3 className="text-base font-bold text-neutral-600 mb-3">
                  {"Details: "}
                </h3>

                <FormGroup>
                  <Label required>Year</Label>

                  <Controller
                    name="year"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={DEFAULT_FORM_VALUES.year}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <SingleSimpleSelect<number>
                        options={YEARS}
                        value={value}
                        onChange={(value) => onChange(Number(value))}
                        defaultValue={DEFAULT_FORM_VALUES.year}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup>
                  <Label required htmlFor="input-description">
                    Description
                  </Label>

                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={DEFAULT_FORM_VALUES.description}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Textarea
                        id="input-description"
                        rows={2}
                        className="resize-none"
                        onChange={onChange}
                        value={value}
                        error={fieldState.error?.message}
                        maxLength={1000}
                      />
                    )}
                  />
                </FormGroup>

                <h3 className="text-base font-bold text-neutral-600 mb-3">
                  {"Camera Setting: "}
                </h3>

                <div className="grid grid-cols-2 gap-x-4">
                  <FormGroup>
                    <Label>ISO</Label>

                    <Controller
                      name="iso"
                      control={control}
                      defaultValue={DEFAULT_FORM_VALUES.iso}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <SearchableSelect
                          value={value}
                          options={SelectDataFormatter<number>(ISO)}
                          onChange={onChange}
                          defaultValue={DEFAULT_FORM_VALUES.iso}
                          onClear={() => onChange(null)}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Shutter Speed</Label>

                    <Controller
                      name="shutter_speed"
                      control={control}
                      defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <SearchableSelect
                          options={SelectDataFormatter<number>(SHUTTER_SPEED)}
                          value={value}
                          onChange={onChange}
                          defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                          onClear={() => onChange(null)}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Aperture</Label>

                    <Controller
                      name="aperture"
                      control={control}
                      defaultValue={DEFAULT_FORM_VALUES.aperture}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <SearchableSelect
                          options={SelectDataFormatter<number>(APERTURE)}
                          value={value}
                          onChange={onChange}
                          defaultValue={DEFAULT_FORM_VALUES.aperture}
                          onClear={() => onChange(null)}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </FormGroup>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="justify-between pt-0">
              <div>
                {!!onDelete && (
                  <Button
                    color="dark"
                    type="button"
                    size="small"
                    onClick={onDelete}
                    rounded
                  >
                    Delete
                  </Button>
                )}
              </div>

              <div className="flex flex-row gap-3">
                <Button
                  type="button"
                  variant="text"
                  color="secondary"
                  size="small"
                  disabled={!formState.isDirty || formState.isSubmitting}
                  onClick={onResetFormHandler}
                  rounded
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  size="small"
                  disabled={
                    !isEmpty(formState.errors) ||
                    !formState.isValid ||
                    !formState.isDirty
                  }
                  isLoading={formState.isSubmitting}
                  rounded
                >
                  {submitButtonText}
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </fieldset>
      </form>
    </Fragment>
  );
};

export default DaydreamForm;
