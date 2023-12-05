"use client";

import {
  BaseSkeletonLoader,
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
import {
  FormEvent,
  Fragment,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isEmpty, parseInt } from "lodash";
import { SelectDataFormatter } from "@/utils";
import { DreamFormParams } from "@/features/daydreams/types";
import { any, number, object, string } from "zod";
import { FileAPIDataStructure } from "@/features/files/types";
import { FaRegImages } from "react-icons/fa6";
import { PiXBold } from "react-icons/pi";
import GalleryDialog from "@/app/admin/(modules)/daydreams/_components/GalleryDialog";
import SupabaseImage from "@/app/admin/(modules)/daydreams/_components/SupabaseImage";
import classNames from "classnames";

export const DreamSchema = object({
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
  file_id: string().trim().min(1, "Image is required."),
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
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [image, setImage] = useState<FileAPIDataStructure | null>(
    (item?.file as FileAPIDataStructure) ?? null
  );

  const {
    handleSubmit,
    formState,
    control,
    getValues,
    reset,
    setValue,
    trigger,
  } = useForm<DreamFormParams>({
    mode: "onChange",
    defaultValues: useMemo(() => item, [item]),
    resolver: zodResolver(DreamSchema),
  });

  useEffect(() => {
    reset(item);

    if (!formState.isSubmitting) {
      setImage((item?.file as FileAPIDataStructure) ?? null);
    }
  }, [item]);

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    onResetFormHandler();
  };

  const onResetFormHandler = () => {
    setImage((item?.file as FileAPIDataStructure) ?? null);
    reset(item);
  };

  return (
    <Fragment>
      <form
        method="post"
        onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
        className="max-w-md w-full sticky top-2"
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
                {"Photo: "}
              </h3>

              <div className="w-full mb-3">
                <div
                  className={classNames(
                    [
                      !!formState.errors.file_id
                        ? "border-red-700 bg-red-100"
                        : "border-neutral-200 hover:border-neutral-400 bg-neutral-100",
                    ],
                    "group relative w-52 mx-auto aspect-square overflow-hidden border-2 border-dashed rounded-md"
                  )}
                >
                  {image && (
                    <button
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-neutral-700 transition-colors cursor-pointer p-1 z-[1]"
                      onClick={async () => {
                        setImage(null);
                        setValue("file_id", null);
                        await trigger("file_id");
                      }}
                    >
                      <PiXBold size={20} />
                    </button>
                  )}

                  <div
                    className="relative h-full w-full inline-flex items-center justify-center cursor-pointer"
                    onClick={() => setIsGalleryDialogOpen(true)}
                  >
                    {image ? (
                      <Suspense
                        fallback={
                          <div className="p-1 w-full h-full">
                            <BaseSkeletonLoader className="aspect-square" />
                          </div>
                        }
                      >
                        <SupabaseImage
                          src={image.storage_file_path}
                          alt={image.name}
                          className="w-full h-full object-contain group-hover:opacity-90"
                          quality={75}
                          width={480}
                          height={480}
                        />
                      </Suspense>
                    ) : (
                      <FaRegImages
                        className={classNames(
                          [
                            !!formState.errors.file_id
                              ? "text-red-600 group-hover:text-red-700"
                              : "text-neutral-400 group-hover:text-neutral-500",
                          ],
                          "text-2xl transition-colors pointer-events-none "
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
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
                    color="danger"
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

      <GalleryDialog
        isOpen={isGalleryDialogOpen}
        onClose={() => setIsGalleryDialogOpen(false)}
        onSelect={async (value) => {
          setImage(value);
          setIsGalleryDialogOpen(false);
          setValue("file_id", value.id, { shouldDirty: true });
          await trigger("file_id");
        }}
        selected={image}
      />
    </Fragment>
  );
};

export default DaydreamForm;
