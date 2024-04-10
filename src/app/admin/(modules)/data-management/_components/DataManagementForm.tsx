import {
  BaseSkeletonLoader,
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
  Textarea,
} from "@/components";
import { InputField } from "@/components/Form/InputField";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { useQueryState } from "next-usequerystate";
import { FormEvent, Suspense, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaxonomyFormData } from "@/features/term_taxonomy/api/createTaxonomy";
import { any, object, string } from "zod";
import { find, isEmpty } from "lodash";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";

export interface DataManagementFormProps {
  title?: string;
  item?: TaxonomyFormData;
  onSubmit: (value: TaxonomyFormData) => Promise<void>;
  onDelete?: () => void;
  submitButtonText?: string;
}

export const TERM_TAXONOMY_DEFAULT_VALUES: TaxonomyFormData = {
  name: "",
  term_id: "",
  parent_id: undefined,
  description: undefined,
};

interface TaxonomyFormStructure {
  name: string;
  description?: string;
  parent_id?: string;
}

export const DataManagementForm = ({
  onSubmit,
  item = TERM_TAXONOMY_DEFAULT_VALUES,
  title = "Create",
  submitButtonText = "Add",
}: DataManagementFormProps) => {
  const [term] = useQueryState("type", {
    shallow: false,
    defaultValue: "",
  });
  const { data } = useGetTermList();

  const selectedTerm = useMemo(() => {
    return find(data, { id: term });
  }, [term, data]);

  const getParentType = useMemo(() => {
    if (!selectedTerm) return undefined;

    switch (selectedTerm.identifier) {
      case TERM_IDENTIFIER.MEDIA_DETAIL:
        return find(data, { identifier: TERM_IDENTIFIER.SOURCE });
      case TERM_IDENTIFIER.SOURCE:
        return find(data, { identifier: TERM_IDENTIFIER.QUOTE_CATEGORY });
      default:
        return undefined;
    }
  }, [selectedTerm]);

  const TaxonomySchema = useMemo(() => {
    return object({
      name: string().min(1, "The name field is required"),
      description: string().nullable(),
      parent_id: any().refine(
        (input) => !(getParentType && !input?.length),
        "The Parent Type field is required."
      ),
    });
  }, [getParentType]);

  const { data: parentList } = useGetTaxonomyByTermId({
    filter: {
      term_id: getParentType?.id,
    },
  });

  const { handleSubmit, formState, control, getValues, reset } =
    useForm<TaxonomyFormStructure>({
      mode: "onChange",
      defaultValues: useMemo(() => item, [item]),
      resolver: zodResolver(TaxonomySchema),
    });

  const onSubmitHandler = async () => {
    await onSubmit({
      ...getValues(),
      term_id: term,
    });
    reset(item);
  };

  useEffect(() => {
    reset(item);
  }, [term]);

  useEffect(() => {
    if (!formState.isSubmitting) reset(item);
  }, [item, formState.isSubmitting]);

  return (
    <form
      method="post"
      onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
      className="sticky top-2 w-80 shrink-0"
    >
      <fieldset disabled={formState.isSubmitting}>
        <CardRoot rounded>
          <CardHeader>
            <CardTitle>
              {title} {selectedTerm?.name || "Taxonomy"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label required>Name</Label>
              <Controller
                defaultValue={item?.name || ""}
                name="name"
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Suspense
                    fallback={
                      <BaseSkeletonLoader
                        className="rounded-md"
                        style={{ height: "40px" }}
                      />
                    }
                  >
                    <InputField
                      value={value}
                      onChange={onChange}
                      isError={fieldState.invalid}
                    />

                    {fieldState.error?.message && (
                      <FormErrorMessage>
                        {fieldState.error?.message}
                      </FormErrorMessage>
                    )}
                  </Suspense>
                )}
              />
            </FormGroup>

            {getParentType && (
              <FormGroup>
                <Label required>Parent Type</Label>
                <Controller
                  defaultValue={item?.parent_id || ""}
                  name="parent_id"
                  control={control}
                  render={({ field: { value, onChange }, fieldState }) => (
                    <Suspense
                      fallback={
                        <BaseSkeletonLoader
                          className="rounded-md"
                          style={{ height: "40px" }}
                        />
                      }
                    >
                      <SearchableSelect
                        name="media_detail"
                        options={
                          parentList?.map((media) => ({
                            text: media.name,
                            value: media.id,
                          })) || []
                        }
                        value={value ?? ""}
                        error={fieldState.error?.message}
                        onChange={onChange}
                      />
                    </Suspense>
                  )}
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label>Description</Label>
              <Controller
                defaultValue={item?.description || ""}
                name="description"
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <Suspense
                    fallback={
                      <BaseSkeletonLoader
                        className="rounded-md"
                        style={{ height: "85px" }}
                      />
                    }
                  >
                    <Textarea
                      value={value}
                      onChange={onChange}
                      rows={4}
                      error={fieldState.error?.message}
                    />
                  </Suspense>
                )}
              />
            </FormGroup>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              type="button"
              size="small"
              color="secondary"
              rounded
              onClick={() => reset(item)}
              disabled={formState.isSubmitting || !formState.isDirty}
            >
              Reset
            </Button>

            <Button
              type="submit"
              size="small"
              rounded
              disabled={
                !isEmpty(formState.errors) ||
                !formState.isValid ||
                !formState.isDirty
              }
              isLoading={formState.isSubmitting}
            >
              {submitButtonText} {selectedTerm?.name || "Taxonomy"}
            </Button>
          </CardFooter>
        </CardRoot>
      </fieldset>
    </form>
  );
};

export const DataManagementFormLoading = () => (
  <CardRoot rounded className="w-80 shrink-0">
    <CardHeader>
      <BaseSkeletonLoader
        className="w-1/2 rounded-md"
        style={{ height: "28px" }}
      />
    </CardHeader>
    <CardBody>
      <FormGroup>
        <Label required>Name</Label>
        <BaseSkeletonLoader className="rounded-md" style={{ height: "40px" }} />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <BaseSkeletonLoader
          className="rounded-md"
          style={{ height: "118px" }}
        />
      </FormGroup>
    </CardBody>
    <CardFooter className="justify-end">
      <BaseSkeletonLoader
        className="w-24 rounded-md"
        style={{ height: "36px" }}
      />
      <BaseSkeletonLoader
        className="w-24 rounded-md"
        style={{ height: "36px" }}
      />
    </CardFooter>
  </CardRoot>
);
