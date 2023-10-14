import {Fragment, ReactNode} from 'react'
import {Dialog as UIDialog, Transition} from '@headlessui/react'
import {BaseButtonProps, Button, CardBody, CardFooter, CardHeader, CardRoot, CardTitle} from "@/components";
import {PropType} from "@/types";

export interface DialogProps {
    children?: ReactNode,
    isOpen: boolean,
    onClose?: () => void
}

export const Dialog = (props: DialogProps) => {
    const {children, isOpen, onClose} = props;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <UIDialog
                as="div"
                className="fixed inset-0 z-[100]"
                onClose={() => onClose ? onClose() : null}
            >
                <div className="flex flex-col h-full xs:p-1 md:p-2.5">
                    <UIDialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="h-full">
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </UIDialog>
        </Transition>
    )
}

interface AlertDialogProps extends DialogProps {
    title?: string;
    onConfirm: () => void;
    confirmButtonText?: string;
    confirmButtonColor?: PropType<BaseButtonProps, "color">
    isLoading?: boolean;
}

export const AlertDialog = ({
    isOpen,
    onClose,
    title,
    onConfirm,
    isLoading,
    children,
    confirmButtonText = "Yes",
    confirmButtonColor = "dark",
}: AlertDialogProps) => (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <CardRoot className="max-w-xl mx-auto mt-20">
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardBody>{children}</CardBody>
            <CardFooter className="justify-end">
                <Button
                    variant="plain"
                    color="secondary"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>

                <Button
                    color={confirmButtonColor}
                    onClick={onConfirm}
                    isLoading={isLoading}
                >
                    {confirmButtonText}
                </Button>
            </CardFooter>
        </CardRoot>
    </Dialog>
)