import {
  Button,
  CardBody,
  CardFooter,
  CardRoot,
  Dialog,
  DialogProps,
  InputGroup,
  InputGroupText,
  Label,
} from "@/components";
import { InputField } from "@/components/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { first, isEmpty } from "lodash";
import { FormEvent } from "react";
import { useUpdateFileMutation } from "@/features/files/api/updateFile";
import { FileAPIDataStructure } from "@/features/files/types";
import toast from "react-hot-toast";

export interface RenameDialogProps
  extends Required<Omit<DialogProps, "children">> {
  item: FileAPIDataStructure;
}

export const RenameFormSchema = object({
  name: string().trim().min(1, "The name field is required."),
});

export interface RenameFormStructure {
  name: string | undefined;
}

export const RENAME_DEFAULT_FORM_VALUES: RenameFormStructure = {
  name: undefined,
};

export const RenameDialog = ({ isOpen, onClose, item }: RenameDialogProps) => {
  const fileType = first(item.name.match(/(\.[\w\W]*)$/)) ?? ".jpg";

  const updateFileMutation = useUpdateFileMutation();
  const { handleSubmit, formState, getValues, reset, register } =
    useForm<RenameFormStructure>({
      mode: "onChange",
      defaultValues: RENAME_DEFAULT_FORM_VALUES,
      resolver: zodResolver(RenameFormSchema),
    });

  const { ref: nameRef, ...nameRegister } = register("name");

  const onSubmitHandler = async () => {
    const name = `${getValues("name")}${fileType}`;

    await toast.promise(
      updateFileMutation.mutateAsync({
        item: item,
        formData: {
          ...item,
          name,
          storage_file_path: item.storage_file_path.replace(
            item.name,
            `${getValues("name")}${fileType}`
          ),
        },
      }),
      {
        success: "File successfully renamed.",
        loading: "Renaming file...",
        error: (error) => error,
      }
    );

    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form
        method="post"
        onSubmit={(event: FormEvent) => handleSubmit(onSubmitHandler)(event)}
      >
        <fieldset
          className="disabled:opacity-95"
          disabled={formState.isSubmitting}
        >
          <CardRoot rounded className="max-w-sm mx-auto mt-24">
            <CardBody>
              <Label htmlFor="renameInput" required>
                Rename
              </Label>
              <InputGroup>
                <InputField id="renameInput" ref={nameRef} {...nameRegister} />
                <InputGroupText>{fileType}</InputGroupText>
              </InputGroup>
            </CardBody>
            <CardFooter className="justify-end pt-0">
              <Button
                rounded
                size="small"
                variant="text"
                color="secondary"
                onClick={() => {
                  onClose();
                  reset();
                }}
                disabled={formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                rounded
                type="submit"
                size="small"
                isLoading={formState.isSubmitting}
                disabled={!isEmpty(formState.errors) || !formState.isValid}
              >
                Update
              </Button>
            </CardFooter>
          </CardRoot>
        </fieldset>
      </form>
    </Dialog>
  );
};
