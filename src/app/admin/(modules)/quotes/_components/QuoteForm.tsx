"use client";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FormGroup,
  Label,
  Textarea,
} from "@/components";
import { FormEvent, Suspense, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, object } from "zod";
import { isEmpty } from "lodash";
import SourceSearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/SourceSearchableSelect";
import CategorySearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/CategorySearchableSelect";
import MediaDetailSearchableSelect from "@/app/admin/(modules)/quotes/_components/Select/MediaDetailSearchableSelect";
import QuoteInputFieldLoading from "@/app/admin/(modules)/quotes/_components/Loading/QuoteInputFieldLoading";

export const DEFAULT_FORM_VALUES: QuoteFormStructure = {
  category_id: "",
  source_id: "",
  content: "",
  media_detail_id: "",
};

export interface QuoteFormStructure {
  category_id: string;
  source_id: string;
  media_detail_id: string;
  content: string;
}

export interface QuoteFormProps {
  item?: QuoteFormStructure;
  onSubmit: (value: QuoteFormStructure) => Promise<void>;
  onDelete?: () => void;
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const QuoteSchema = object({
  content: any().refine(
    (data) => data.length !== 0,
    "The content field is required"
  ),
  category_id: any().refine(
    (data) => data !== null,
    "The category field is required"
  ),
  source_id: any().refine(
    (data) => data !== null,
    "The source field is required"
  ),
  media_detail_id: any().refine(
    (data) => data !== null,
    "The media detail field is required"
  ),
});

const QuoteForm = ({
  item = DEFAULT_FORM_VALUES,
  onSubmit,
  onDelete,
  title,
  submitButtonText = "Submit",
}: QuoteFormProps) => {
  const {
    handleSubmit,
    formState,
    control,
    getValues,
    reset,
    setValue,
    watch,
  } = useForm<QuoteFormStructure>({
    mode: "onChange",
    defaultValues: useMemo(() => item, [item]),
    resolver: zodResolver(QuoteSchema),
  });

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    reset(item);
  };

  useEffect(() => {
    reset(item);
  }, [item]);

  return (
    <form
      method="post"
      onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
      className="sticky top-2 max-w-sm w-full"
    >
      <fieldset disabled={formState.isSubmitting}>
        <CardRoot
          rounded
          className="focus-within:drop-shadow-lg hover:drop-shadow-xl focus:drop-shadow-lg transition-all w-full"
        >
          <CardHeader className="pb-0">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label required>Category</Label>

              <Controller
                defaultValue={item.category_id}
                name="category_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Suspense fallback={<QuoteInputFieldLoading />}>
                    <CategorySearchableSelect
                      value={value}
                      defaultValue={item.category_id}
                      error={fieldState.error?.message}
                      onChange={(value) => {
                        onChange(value);
                        setValue("media_detail_id", "");
                        setValue("source_id", "");
                      }}
                    />
                  </Suspense>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label required>Artist, Movie or Book title</Label>

              <Controller
                defaultValue={item.source_id}
                name="source_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Suspense fallback={<QuoteInputFieldLoading />}>
                    <SourceSearchableSelect
                      categoryId={watch("category_id")}
                      disabled={!watch("category_id")}
                      value={value}
                      defaultValue={item.source_id}
                      error={fieldState.error?.message}
                      onChange={(value) => {
                        onChange(value);
                        setValue("media_detail_id", "");
                      }}
                    />
                  </Suspense>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label required>Song Title, Interview, or Character Name</Label>

              <Controller
                defaultValue={item.media_detail_id}
                name="media_detail_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Suspense fallback={<QuoteInputFieldLoading />}>
                    <MediaDetailSearchableSelect
                      value={value}
                      sourceId={watch("source_id")}
                      disabled={!watch("source_id")}
                      defaultValue={item.media_detail_id}
                      error={fieldState.error?.message}
                      onChange={onChange}
                    />
                  </Suspense>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label required htmlFor="input-content">
                Content
              </Label>

              <Controller
                defaultValue={item.content}
                name="content"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Textarea
                    id="input-content"
                    name="input-content"
                    rows={5}
                    maxLength={1000}
                    value={value}
                    error={fieldState.error?.message}
                    onChange={onChange}
                  />
                )}
              />
            </FormGroup>
          </CardBody>
          <CardFooter className="justify-between gap-3 pt-0">
            <div>
              {!!onDelete && (
                <Button
                  rounded
                  color="danger"
                  type="button"
                  size="small"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              )}
            </div>

            <div className="flex flex-row gap-3">
              <Button
                rounded
                type="button"
                variant="text"
                color="secondary"
                size="small"
                disabled={!formState.isDirty}
                onClick={() => reset()}
              >
                Reset
              </Button>

              <Button
                rounded
                type="submit"
                size="small"
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

export default QuoteForm;
