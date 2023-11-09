"use client";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FormErrorMessage,
  FormGroup,
  Label,
  SearchableSelect,
  SingleSimpleSelect,
  Textarea,
} from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ACCEPTED_IMAGE_TYPES,
  APERTURE,
  DEFAULT_FORM_VALUES,
  ISO,
  SHUTTER_SPEED,
  YEARS,
} from "@/features/daydreams/data";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { PiImageLight, PiX } from "react-icons/pi";
import Image from "next/image";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { SelectDataFormatter } from "@/utils";
import { CreateDreamFormInterface } from "@/features/daydreams/types";
import { ZodObject } from "zod";
import { ImageFileData } from "@/features/files/types";

interface DaydreamFormComponentProps {
  item?: CreateDreamFormInterface;
  onSubmit: (value: CreateDreamFormInterface) => Promise<void>;
  onDelete?: () => void;
  defaultImage: string;
  schema: ZodObject<any>;
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

const DaydreamForm = ({
  item = DEFAULT_FORM_VALUES,
  onSubmit,
  onDelete,
  schema,
  title,
  defaultImage = "",
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
}: DaydreamFormComponentProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [fileDetails, setFileDetails] = useState<ImageFileData>(item!.image);
  const [localImage, setLocalImage] = useState<string>(defaultImage);

  const {
    handleSubmit,
    formState,
    control,
    getValues,
    register,
    reset,
    resetField,
    setValue,
    trigger,
  } = useForm<CreateDreamFormInterface>({
    mode: "onChange",
    defaultValues: useMemo(() => item, [item]),
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset(item);
  }, [item]);

  const {
    ref: imageRegisterRef,
    onChange: _,
    ...imageRegister
  } = register("image.file");

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    onResetFormHandler();
  };

  const onImageInputHandler = async (event: FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget?.files || [];

    if (files.length) {
      const imageFile = files[0];

      const details = {
        ...fileDetails,
        file: files as FileList,
        name: imageFile.name,
        type: imageFile.type,
        size: imageFile.size,
      };

      if (ACCEPTED_IMAGE_TYPES.includes(imageFile.type)) {
        setLocalImage(URL.createObjectURL(imageFile));
      }

      setFileDetails(details);
      setValue("image", details, { shouldDirty: true });

      await trigger("image.file");
    } else onResetImageInputHandler();
  };

  const onResetImageInputHandler = () => {
    resetField("image", { keepDirty: false });

    setFileDetails(DEFAULT_FORM_VALUES.image);
    setLocalImage(defaultImage);

    if (imageInputRef?.current) {
      imageInputRef.current.value = "";
    }
  };

  const onResetFormHandler = () => {
    onResetImageInputHandler();
    reset(item);
  };

  const getImageDimensions = async (image: HTMLImageElement) => {
    const details = {
      ...fileDetails,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };

    setFileDetails(details);
    setValue("image", details);

    await trigger("image");
  };

  return (
    <form
      method="post"
      onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
    >
      <fieldset
        className="disabled:opacity-95"
        disabled={formState.isSubmitting}
      >
        <CardRoot>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid gap-6 grid-cols-2">
              <FormGroup className="flex flex-col">
                <Label>Image: </Label>

                <small className="leading-snug block text-neutral-500 text-xs mb-2">
                  File types supported: JPG, JPEG, PNG, and WEBP. Max size: 15
                  MB
                </small>

                <div
                  className={classNames(
                    "relative grow group border cursor-pointer",
                    [
                      !!formState.errors?.image
                        ? "border-red-700"
                        : "border-neutral-200",
                    ]
                  )}
                >
                  <div
                    className="h-full w-full"
                    onClick={() =>
                      imageInputRef && imageInputRef.current?.click()
                    }
                  >
                    {!!localImage ? (
                      <div className="relative w-full h-full bg-neutral-200">
                        <Image
                          src={localImage}
                          alt={fileDetails.name}
                          className="w-full h-full object-contain pointer-events-none group-hover:opacity-90"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={75}
                          priority={fileDetails.size > 1280}
                          fill
                          onLoadingComplete={getImageDimensions}
                        />
                      </div>
                    ) : (
                      <div
                        className={classNames(
                          "absolute inset-0 flex items-center justify-center z-10",
                          [
                            !!formState.errors?.image?.file
                              ? "bg-red-100 text-red-700"
                              : "hover:bg-neutral-200 hover:bg-opacity-25 text-neutral-600",
                          ]
                        )}
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <PiImageLight size={28} />
                        </span>
                      </div>
                    )}
                  </div>

                  {localImage !== defaultImage && (
                    <button
                      className="absolute top-1 right-2 p-2 text-neutral-700 transition-all opacity-0 group-hover:opacity-100 z-10"
                      onClick={onResetImageInputHandler}
                    >
                      <PiX size={24} />
                    </button>
                  )}

                  <input
                    accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                    type="file"
                    className="hidden"
                    tabIndex={-1}
                    ref={(ref) => {
                      imageRegisterRef(ref);
                      imageInputRef.current = ref;
                    }}
                    onChange={onImageInputHandler}
                    {...imageRegister}
                  />
                </div>

                {formState.errors?.image?.file && (
                  <div className="mt-1.5">
                    <FormErrorMessage>
                      {formState.errors!.image!.file.message}
                    </FormErrorMessage>
                  </div>
                )}
              </FormGroup>

              <div>
                <h3 className="text-lg font-bold text-neutral-600 mb-3">
                  Details:{" "}
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
                        onChange={onChange}
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
                        rows={3}
                        className="resize-none"
                        onChange={onChange}
                        value={value}
                        error={fieldState.error?.message}
                        maxLength={1000}
                      />
                    )}
                  />
                </FormGroup>

                <h3 className="text-lg font-bold text-neutral-600 mb-3">
                  Camera Setting:{" "}
                </h3>

                <FormGroup>
                  <Label required>ISO</Label>

                  <Controller
                    name="iso"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={DEFAULT_FORM_VALUES.iso as any}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <SearchableSelect
                        value={value}
                        options={SelectDataFormatter<number>(ISO)}
                        onChange={onChange}
                        defaultValue={DEFAULT_FORM_VALUES.iso}
                        error={fieldState.error?.message}
                        clearable
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup>
                  <Label required>Shutter Speed</Label>

                  <Controller
                    name="shutter_speed"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <SearchableSelect
                        options={SelectDataFormatter<number>(SHUTTER_SPEED)}
                        value={value}
                        onChange={onChange}
                        defaultValue={DEFAULT_FORM_VALUES.shutter_speed}
                        error={fieldState.error?.message}
                        clearable
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup>
                  <Label required>Aperture</Label>

                  <Controller
                    name="aperture"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={DEFAULT_FORM_VALUES.aperture}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <SearchableSelect
                        options={SelectDataFormatter<number>(APERTURE)}
                        value={value}
                        onChange={onChange}
                        defaultValue={DEFAULT_FORM_VALUES.aperture}
                        error={fieldState.error?.message}
                        clearable
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
          </CardBody>
          <CardFooter className="justify-between gap-3">
            <div>
              {!!onDelete && (
                <Button color="danger" type="button" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </div>

            <div className="flex flex-row gap-3">
              <Button
                type="button"
                variant="plain"
                color="secondary"
                disabled={!formState.isDirty || formState.isSubmitting}
                onClick={onResetFormHandler}
              >
                {cancelButtonText}
              </Button>

              <Button
                type="submit"
                disabled={
                  !isEmpty(formState.errors) ||
                  !formState.isValid ||
                  !formState.isDirty
                }
                isLoading={formState.isSubmitting}
              >
                {submitButtonText}
              </Button>
            </div>
          </CardFooter>
        </CardRoot>
      </fieldset>
    </form>
  );
};

export default DaydreamForm;
