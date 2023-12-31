import {
  Button,
  CardBody,
  CardFooter,
  CardRoot,
  FormErrorMessage,
  FormGroup,
  InputGroup,
  InputGroupText,
  Label,
  Textarea,
} from "@/components";
import { InputField, InputFieldLoading } from "@/components/Form/InputField";
import { FaGlobeAsia } from "react-icons/fa";
import { FaCode, FaFigma } from "react-icons/fa6";
import { FormEvent, Fragment, Suspense, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tables } from "@/types";
import { ScreenshotWrapper } from "@/app/admin/(modules)/projects/_components/ScreenshotWrapper";
import { array, object, string } from "zod";
import {
  ScreenshotForm,
  ScreenshotSchema,
} from "@/app/admin/(modules)/projects/_components/ScreenshotDialog";
import { ProjectTypeSelect } from "@/app/admin/(modules)/projects/_components/Select/ProjectTypeSelect";
import { useRouter } from "next/navigation";
import SkillSearchableSelect from "@/app/admin/(modules)/projects/_components/Select/SkillSearchableSelect";

export interface ProjectFormParams
  extends Omit<Tables<"projects">, "created_at" | "id" | "project_order"> {
  skills: string[];
  screenshots: ScreenshotForm[];
}

export const DEFAULT_PROJECT_FORM_VALUES: ProjectFormParams = {
  title: "",
  description: "",
  project_type_id: "",
  repository_link: "",
  design_link: "",
  website_link: "",
  screenshots: [],
  skills: [],
};

export interface ProjectFormProps {
  onSubmit: (value: ProjectFormParams) => Promise<void>;
  item?: ProjectFormParams;
  submitButtonText: string;
}

export const ProjectSchema = object({
  title: string().trim().min(1, "The title field is required."),
  description: string().trim().min(1, "The description field is required."),
  website_link: string().trim().optional(),
  design_link: string().trim().optional(),
  repository_link: string().trim().optional(),
  screenshots: array(ScreenshotSchema).optional(),
  skills: array(string().trim()).min(1, "The Skill(s) field is required."),
  project_type_id: string().trim().min(1, "The type field is required."),
});

export const ProjectForm = ({
  submitButtonText,
  onSubmit,
  item = DEFAULT_PROJECT_FORM_VALUES,
}: ProjectFormProps) => {
  const router = useRouter();

  const { handleSubmit, formState, control, getValues, reset, trigger } =
    useForm<ProjectFormParams>({
      mode: "onChange",
      defaultValues: useMemo(() => item, [item]),
      resolver: zodResolver(ProjectSchema),
    });

  const onSubmitHandler = async () => {
    await onSubmit(getValues());
    reset(item);
  };

  useEffect(() => {
    reset(item);
  }, [item]);

  return (
    <Fragment>
      <CardRoot rounded className="w-4/5 mx-auto">
        <form
          method="post"
          onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
        >
          <fieldset
            className="disabled:opacity-95"
            disabled={formState.isSubmitting}
          >
            <CardBody className="grid grid-cols-2 gap-8">
              <Controller
                name="screenshots"
                control={control}
                defaultValue={item.screenshots}
                render={({ field: { onChange, value } }) => (
                  <ScreenshotWrapper
                    items={value}
                    onChange={async (value) => {
                      onChange(value);
                      await trigger("screenshots");
                    }}
                  />
                )}
              />

              <div>
                <h3 className="text-base font-bold text-neutral-600 mb-3">
                  {"Details: "}
                </h3>
                <FormGroup>
                  <Label required htmlFor="title-input-form">
                    Title
                  </Label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item.title}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Fragment>
                        <InputField
                          id="title-input-form"
                          type="text"
                          name="title"
                          autoCorrect="off"
                          value={value}
                          onChange={onChange}
                          isError={fieldState.invalid}
                        />

                        {fieldState.invalid && (
                          <FormErrorMessage>
                            {fieldState.error?.message}
                          </FormErrorMessage>
                        )}
                      </Fragment>
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label required>Description</Label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item.description}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Textarea
                        rows={4}
                        value={value}
                        id="description-input-form"
                        name="description"
                        autoCorrect="off"
                        onChange={onChange}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup>
                  <Label required>Type</Label>
                  <Controller
                    name="project_type_id"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item.project_type_id}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <Suspense fallback={<InputFieldLoading />}>
                        <ProjectTypeSelect
                          onChange={onChange}
                          value={value}
                          defaultValue={item?.project_type_id}
                          error={fieldState.error?.message}
                        />
                      </Suspense>
                    )}
                  />
                </FormGroup>

                <FormGroup>
                  <Label required>Technologies</Label>

                  <Controller
                    name="skills"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item.skills}
                    render={({
                      field: { onChange, value: controlValue },
                      fieldState,
                    }) => (
                      <Suspense fallback={<InputFieldLoading />}>
                        <SkillSearchableSelect
                          onChange={async (value) => {
                            onChange(value);
                            await trigger("skills");
                          }}
                          value={controlValue}
                          defaultValue={item?.skills}
                          error={fieldState.error?.message}
                        />
                      </Suspense>
                    )}
                  />
                </FormGroup>

                <h3 className="text-base font-bold text-neutral-600 mb-3">
                  {"Links: "}
                </h3>

                <div className="flex flex-col gap-2">
                  <Controller
                    name="website_link"
                    control={control}
                    rules={{ required: false }}
                    defaultValue={item.website_link}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <InputGroup>
                        <InputGroupText
                          className="w-12"
                          data-tooltip-id="admin-tooltip"
                          data-tooltip-content="Website"
                        >
                          <FaGlobeAsia />
                        </InputGroupText>
                        <InputGroupText className="text-neutral-500">
                          https://
                        </InputGroupText>
                        <InputField
                          placeholder="alexanderjeamoro.vercel.app/"
                          type="text"
                          name="website_link"
                          autoComplete="off"
                          autoCorrect="off"
                          value={value ?? undefined}
                          onChange={onChange}
                          isError={fieldState.invalid}
                        />
                      </InputGroup>
                    )}
                  />

                  <Controller
                    name="repository_link"
                    control={control}
                    rules={{ required: false }}
                    defaultValue={item.repository_link}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <InputGroup>
                        <InputGroupText
                          className="w-12"
                          data-tooltip-id="admin-tooltip"
                          data-tooltip-content="Repository"
                        >
                          <FaCode />
                        </InputGroupText>
                        <InputGroupText className="text-neutral-500">
                          https://github.com/
                        </InputGroupText>
                        <InputField
                          placeholder="portfolio"
                          type="text"
                          name="repository_link"
                          autoComplete="off"
                          autoCorrect="off"
                          value={value ?? undefined}
                          onChange={onChange}
                          isError={fieldState.invalid}
                        />
                      </InputGroup>
                    )}
                  />

                  <Controller
                    name="design_link"
                    control={control}
                    rules={{ required: false }}
                    defaultValue={item.design_link}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <InputGroup>
                        <InputGroupText
                          className="w-12"
                          data-tooltip-id="admin-tooltip"
                          data-tooltip-content="Figma Design"
                        >
                          <FaFigma />
                        </InputGroupText>
                        <InputGroupText className="text-neutral-500">
                          https://www.figma.com/
                        </InputGroupText>
                        <InputField
                          type="text"
                          name="design_link"
                          autoComplete="off"
                          autoCorrect="off"
                          value={value ?? undefined}
                          onChange={onChange}
                          isError={fieldState.invalid}
                        />
                      </InputGroup>
                    )}
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter className="justify-between">
              <Button
                rounded
                type="button"
                size="small"
                variant="text"
                color="secondary"
                disabled={formState.isSubmitting}
                onClick={() => router.back()}
              >
                Back
              </Button>
              <div className="inline-flex flex-row gap-3">
                <Button
                  rounded
                  type="button"
                  size="small"
                  variant="text"
                  color="secondary"
                  disabled={formState.isSubmitting || !formState.isDirty}
                  onClick={() => reset(item)}
                >
                  Reset
                </Button>
                <Button
                  rounded
                  type="submit"
                  size="small"
                  disabled={!formState.isDirty || !formState.isValid}
                  isLoading={formState.isSubmitting}
                >
                  {submitButtonText}
                </Button>
              </div>
            </CardFooter>
          </fieldset>
        </form>
      </CardRoot>
    </Fragment>
  );
};
