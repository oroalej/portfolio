"use client";

import { ReactNode } from "react";
import * as UIDialog from "@radix-ui/react-dialog";

export interface DialogProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Dialog = (props: DialogProps) => {
  const { children, isOpen, onClose } = props;

  return (
    <UIDialog.Root
      open={isOpen}
      onOpenChange={() => (onClose ? onClose() : null)}
    >
      <UIDialog.Portal>
        <UIDialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
        <UIDialog.Content className="fixed inset-0 z-[100]">
          <div className="flex flex-col h-full xs:p-1 md:p-3.5">
            <div className="h-full">{children}</div>
          </div>
        </UIDialog.Content>
      </UIDialog.Portal>
    </UIDialog.Root>
  );
};
