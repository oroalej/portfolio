"use client";

import { ReactNode, useEffect } from "react";
import * as UIDialog from "@radix-ui/react-dialog";
import classNames from "classnames";

export interface DialogProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  isOverlayVisible?: boolean;
  overlayClassName?: string;
}

let activeScrollLocks = 0;
let originalHtmlOverflow: string | null = null;
let originalBodyOverflow: string | null = null;
let originalBodyPaddingRight: string | null = null;

const lockDocumentScroll = () => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const html = document.documentElement;
  const body = document.body;

  if (activeScrollLocks === 0) {
    originalHtmlOverflow = html.style.overflow;
    originalBodyOverflow = body.style.overflow;
    originalBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    }
  }

  activeScrollLocks += 1;

  let isReleased = false;

  return () => {
    if (isReleased) return;

    isReleased = true;
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

    if (activeScrollLocks === 0) {
      html.style.overflow = originalHtmlOverflow ?? "";
      body.style.overflow = originalBodyOverflow ?? "";
      body.style.paddingRight = originalBodyPaddingRight ?? "";

      originalHtmlOverflow = null;
      originalBodyOverflow = null;
      originalBodyPaddingRight = null;
    }
  };
};

export const Dialog = (props: DialogProps) => {
  const {
    children,
    isOpen,
    onClose,
    isOverlayVisible = true,
    overlayClassName,
  } = props;

  useEffect(() => {
    if (!isOpen) return;

    return lockDocumentScroll();
  }, [isOpen]);

  return (
    <UIDialog.Root
      open={isOpen}
      onOpenChange={() => (onClose ? onClose() : null)}
    >
      <UIDialog.Portal>
        {isOverlayVisible && (
          <UIDialog.Overlay
            className={classNames(
              "fixed inset-0 bg-black bg-opacity-60",
              overlayClassName
            )}
          />
        )}
        <UIDialog.Content className="fixed inset-0 z-[100]">
          <div className="flex flex-col h-full xs:p-1 md:p-3.5">
            <div className="h-full">{children}</div>
          </div>
        </UIDialog.Content>
      </UIDialog.Portal>
    </UIDialog.Root>
  );
};
