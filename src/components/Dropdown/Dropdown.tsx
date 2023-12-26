"use client";

import useOpenable from "@/hooks/useOpenable";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as UIScrollArea from "@radix-ui/react-scroll-area";
import { Scrollbar } from "@/components";
import { FC, forwardRef, ReactNode } from "react";
import classNames from "classnames";

interface ChildrenProps {
  children?: ReactNode;
}

export type SelectProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  children?:
    | ((
        props: Pick<ReturnType<typeof useOpenable>, "isOpen"> &
          Required<Pick<SelectProps, "onOpenChange">>
      ) => ReactNode)
    | ReactNode;
};

export const DropdownRoot = (props: {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  children?:
    | ((
        props: Pick<ReturnType<typeof useOpenable>, "isOpen"> &
          Pick<SelectProps, "onOpenChange">
      ) => ReactNode)
    | ReactNode;
}) => {
  const { isOpen, setIsOpen } = useOpenable();
  const { children, open, onOpenChange } = props;

  return (
    <DropdownMenu.Root
      open={open ?? isOpen}
      onOpenChange={onOpenChange ?? setIsOpen}
      modal
    >
      {typeof children === "function"
        ? children({
            isOpen: open ?? isOpen,
            onOpenChange: onOpenChange ?? setIsOpen,
          })
        : children}
    </DropdownMenu.Root>
  );
};

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  { children: ReactNode }
>(({ children }, ref) => (
  <DropdownMenu.Trigger asChild ref={ref}>
    {children}
  </DropdownMenu.Trigger>
));

DropdownTrigger.displayName = "Trigger";

interface DropdownContentProps extends DropdownMenu.DropdownMenuContentProps {
  scroll?: "horizontal" | "vertical" | "both" | "none";
}

export const DropdownContent = (props: DropdownContentProps) => {
  const {
    children,
    scroll,
    side = "bottom",
    align = "center",
    className = "",
    sideOffset = 5,
  } = props;

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content side={side} align={align} sideOffset={sideOffset}>
        <UIScrollArea.Root type="auto">
          <UIScrollArea.Viewport
            className={classNames(
              "min-w-[8rem] bg-white drop-shadow-lg rounded-md border border-gray-200",
              className
            )}
          >
            {children}
          </UIScrollArea.Viewport>

          {scroll && scroll !== "horizontal" && <Scrollbar />}
          {scroll && scroll !== "vertical" && (
            <Scrollbar orientation="horizontal" />
          )}
        </UIScrollArea.Root>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

type DropdownItemProps = {
  icon?: ReactNode;
  align?: "start" | "center" | "end";
} & DropdownMenu.DropdownMenuItemProps;

export const DropdownItem = (props: DropdownItemProps) => {
  const {
    children,
    className,
    align = "center",
    icon: Icon,
    ...remaining
  } = props;

  return (
    <DropdownMenu.Item
      {...remaining}
      className={classNames(
        className,
        "relative flex flex-row leading-tight outline-0 cursor-pointer text-gray-700 mx-1",
        "data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 min-h-[32px]"
      )}
    >
      <div
        className="w-full flex flex-row gap-2 hover:bg-gray-200/80 px-2.5 rounded"
        style={{ alignItems: align }}
      >
        {Icon && (
          <div className="w-5 h-full flex justify-center items-center shrink-0 text-base">
            {Icon}
          </div>
        )}
        <div className="whitespace-nowrap text-ellipsis overflow-hidden self-auto text-sm">
          {children}
        </div>
      </div>
    </DropdownMenu.Item>
  );
};

export const DropdownGroup = (props: ChildrenProps) => (
  <DropdownMenu.Group className="pt-1.5 pb-1 [&>[role='menuitem']]:mb-0.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral-100">
    {props.children}
  </DropdownMenu.Group>
);

export const DropdownLabel = (props: DropdownMenu.DropdownMenuLabelProps) => {
  const { children, className, ...remaining } = props;

  return (
    <DropdownMenu.Label
      {...remaining}
      className={classNames(
        className,
        "text-gray-500/90 text-sm py-1 pl-3.5 pr-3 font-medium"
      )}
    >
      {children}
    </DropdownMenu.Label>
  );
};

export const DropdownDescription: FC = (props) => {
  return (
    <span className="inline-block text-sm px-3.5 text-gray-600 mb-2">
      {props.children}
    </span>
  );
};
