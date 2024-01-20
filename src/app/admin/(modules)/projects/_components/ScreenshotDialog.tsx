import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  Dialog,
  DialogProps,
  FormGroup,
  Label,
  Scrollbar,
} from "@/components";
import { InputField } from "@/components/Form/InputField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { SetRequired } from "@/types";
import { isEqual, pick } from "lodash";
import * as UIScrollArea from "@radix-ui/react-scroll-area";
import GalleryWrapper from "@/app/admin/(modules)/gallery/_components/GalleryWrapper";

export interface ScreenshotForm {
  id?: string;
  title: string;
  file_id: string;
  is_deleted?: boolean;
  is_updated?: boolean;
  is_created?: boolean;
  is_sorted?: boolean;
}

export const ScreenshotSchema = object({
  title: string().trim().min(1, "The title field is required."),
  file_id: string().trim().min(1, "The image field is required."),
});

export const DEFAULT_SCREENSHOT_FORM_VALUES: ScreenshotForm = {
  title: "",
  file_id: "",
};

export interface ScreenshotDialogProps extends DialogProps {
  onSubmit: (value: SetRequired<ScreenshotForm, "id">) => void;
  item: ScreenshotForm;
  excluded?: string[];
}

export const ScreenshotDialog = ({
  isOpen,
  onClose,
  onSubmit,
  excluded = [],
  item = DEFAULT_SCREENSHOT_FORM_VALUES,
}: ScreenshotDialogProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageId, setSelectedImageId] = useState<string>(item.file_id);

  const { handleSubmit, formState, control, getValues, trigger, reset } =
    useForm<Pick<ScreenshotForm, "title" | "file_id">>({
      mode: "onChange",
      defaultValues: useMemo(() => item, [item]),
      resolver: zodResolver(ScreenshotSchema),
    });

  useEffect(() => {
    reset(item);
    setSelectedImageId(item.file_id);
  }, [item]);

  const onSubmitHandler = () => {
    if (!selectedImageId) {
      return;
    }

    const is_created = item.is_created ?? !item?.id;
    const formData = {
      title: getValues().title,
      file_id: getValues().file_id,
    };

    onSubmit({
      id: item?.id ?? crypto.randomUUID(),
      is_created,
      is_updated:
        !is_created && !isEqual(formData, pick(item, ["title", "file_id"])),
      ...formData,
    });

    reset(formData);
    setSelectedImageId(formData.file_id);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog isOpen={isOpen}>
      <form
        method="post"
        onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
      >
        <fieldset
          className="disabled:opacity-95"
          disabled={formState.isSubmitting}
        >
          <CardRoot rounded className="max-w-3xl mx-auto mt-12">
            <CardHeader className="pb-0">
              <CardTitle>Screenshot</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4">
                <UIScrollArea.Root type="auto">
                  <UIScrollArea.Viewport className="h-64 p-1 pr-4">
                    <Controller
                      name="file_id"
                      control={control}
                      rules={{ required: true }}
                      defaultValue={item.file_id}
                      render={({ field: { onChange, value } }) => (
                        <GalleryWrapper
                          excluded={excluded?.filter(
                            (id) => id !== item.file_id
                          )}
                          gap="8px"
                          activeId={value}
                          onSelect={async (selectedValue) => {
                            onChange(selectedValue.id);
                            setSelectedImageId(selectedValue.id);

                            await trigger("file_id");

                            if (titleInputRef.current)
                              titleInputRef.current.focus();
                          }}
                          cols={4}
                          per_page={16}
                        />
                      )}
                    />
                  </UIScrollArea.Viewport>
                  <Scrollbar />
                </UIScrollArea.Root>

                <FormGroup>
                  <Label htmlFor="titleInput" required>
                    Title
                  </Label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item.title}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <InputField
                        id="titleInput"
                        type="text"
                        name="title"
                        autoCorrect="off"
                        value={value}
                        onChange={onChange}
                        isError={fieldState.invalid}
                        ref={titleInputRef}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </CardBody>
            <CardFooter className="justify-end">
              <Button
                rounded
                type="button"
                size="small"
                color="secondary"
                variant="text"
                onClick={() => {
                  setSelectedImageId(item.file_id);
                  reset(item);

                  if (onClose) onClose();
                }}
                disabled={formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                rounded
                type="submit"
                size="small"
                onClick={onSubmitHandler}
                disabled={!formState.isDirty || !formState.isValid}
                isLoading={formState.isSubmitting}
              >
                Proceed
              </Button>
            </CardFooter>
          </CardRoot>
        </fieldset>
      </form>
    </Dialog>
  );
};
