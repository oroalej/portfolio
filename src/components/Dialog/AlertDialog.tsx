import { PropType } from "@/types";
import {
  BaseButtonProps,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  Dialog,
  DialogProps,
} from "@/components";

interface AlertDialogProps extends DialogProps {
  title?: string;
  onConfirm: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonColor?: PropType<BaseButtonProps, "color">;
  isLoading?: boolean;
}

export const AlertDialog = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  isLoading,
  children,
  cancelButtonText = "Cancel",
  confirmButtonText = "Yes",
  confirmButtonColor = "dark",
}: AlertDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <CardRoot className="max-w-lg mx-auto mt-20" rounded>
      {title && (
        <CardHeader className="pb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      {children && <CardBody className="text-neutral-600">{children}</CardBody>}
      <CardFooter className="justify-end pt-0">
        <Button
          rounded
          size="small"
          variant="text"
          color="secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          {cancelButtonText}
        </Button>

        <Button
          rounded
          size="small"
          color={confirmButtonColor}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmButtonText}
        </Button>
      </CardFooter>
    </CardRoot>
  </Dialog>
);
