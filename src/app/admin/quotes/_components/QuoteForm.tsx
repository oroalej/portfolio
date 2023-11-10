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
import { FormEvent, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";
import SourceSearchableSelect from "@/app/admin/quotes/_components/SourceSearchableSelect";
import CategorySearchableSelect from "@/app/admin/quotes/_components/CategorySearchableSelect";
import MediaDetailSearchableSelect from "@/app/admin/quotes/_components/MediaDetailSearchableSelect";
import { isEmpty } from "lodash";

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

const formLabelByCategory: Record<
  string,
  { source: string; media_detail: string }
> = {
  "f0d18182-b25c-4ff6-8fa7-836e1b4226c8": {
    source: "Artist",
    media_detail: "Song Title or Interview",
  },
  "385bddb0-36ab-49d9-8477-fbbd815f270e": {
    source: "Book Title",
    media_detail: "Character",
  },
  "2e996782-2d6b-4757-bf97-332358dab0ca": {
    source: "Movie Title",
    media_detail: "Character",
  },
};

export interface QuoteFormProps {
  item?: QuoteFormStructure;
  onSubmit: (value: QuoteFormStructure) => void;
  onDelete?: () => void;
  schema: ZodObject<any>;
  title: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

const QuoteForm = ({
  item = DEFAULT_FORM_VALUES,
  onSubmit,
  onDelete,
  schema,
  title,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
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
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset(item);
  }, [item]);

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    reset(item);
  };

  return (
    <form
      method="post"
      onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
    >
      <fieldset disabled={formState.isSubmitting}>
        <CardRoot>
          <CardHeader>
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
                  <CategorySearchableSelect
                    clearable
                    value={value}
                    defaultValue={item.category_id}
                    error={fieldState.error?.message}
                    onChange={(value) => {
                      onChange(value);
                      setValue("media_detail_id", "");
                      setValue("source_id", "");
                    }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label required>
                {formLabelByCategory[watch("category_id")]?.source || "Source"}
              </Label>

              <Controller
                defaultValue={item.source_id}
                name="source_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
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
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                {formLabelByCategory[watch("category_id")]?.media_detail ||
                  "Name"}
              </Label>

              <Controller
                defaultValue={item.media_detail_id}
                name="media_detail_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <MediaDetailSearchableSelect
                    value={value}
                    sourceId={watch("source_id")}
                    disabled={!watch("source_id")}
                    defaultValue={item.media_detail_id}
                    error={fieldState.error?.message}
                    onChange={onChange}
                  />
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
                onClick={() => reset()}
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

export default QuoteForm;
