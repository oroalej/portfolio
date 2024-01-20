"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { PiXBold } from "react-icons/pi";
import { BaseComponent } from "@/types";

export interface SelectItem<Type> {
  value: Type;
  text: string;
}

export interface SelectItemProps
  extends Omit<DropdownMenu.DropdownMenuItemProps, "children" | "onSelect"> {
  selected?: boolean;
  text: string;
  value: unknown;
  onSelect: (value: unknown) => void;
}

export interface SelectButtonProps extends BaseComponent {
  clearable?: boolean;
  isChanged?: boolean;
  isError?: boolean;
  isOpen?: boolean;
  onReset?: () => void;
}

export const SelectRoot = ({
  children,
  open,
  onOpenChange,
}: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </DropdownMenu.Root>
);

export const SelectTrigger = ({
  children,
  isChanged,
  onReset,
  clearable = false,
  isError = false,
}: SelectButtonProps) => (
  <div className="relative w-full">
    <DropdownMenu.Trigger
      className={classNames(
        "form-input bg-white flex flex-row justify-between items-stretch relative border min-w-[5rem] w-full min-h-[40px] gap-2 rounded-md text-sm open:ring-2",
        [
          isError
            ? "border-red-600 text-red-600 is-error"
            : "border-neutral-200 text-neutral-700",
        ]
      )}
    >
      <span
        className={classNames("block grow text-left relative pl-3 py-2", [
          clearable ? "pr-9" : "pl-3",
        ])}
      >
        {children}
      </span>
    </DropdownMenu.Trigger>

    {clearable && isChanged && onReset && (
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 outline-none text-neutral-700 cursor-pointer shrink-0 h-full p-3"
        onClick={onReset}
      >
        <PiXBold />
      </button>
    )}
  </div>
);

export const SelectContent = ({
  children,
  className,
  side = "bottom",
  align = "end",
  sideOffset = 5,
  ...remaining
}: DropdownMenu.DropdownMenuContentProps) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className={classNames(
        "z-10 mt-1.5 px-1 space-y-0.5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
        className
      )}
      side={side}
      align={align}
      sideOffset={sideOffset}
      {...remaining}
    >
      {children}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
);

export const SelectItem = ({
  selected,
  className,
  text,
  value,
  onSelect,
  ...remaining
}: SelectItemProps) => (
  <DropdownMenu.Item
    className={classNames(
      "relative select-none rounded py-2 pl-3 pr-9 cursor-pointer hover:bg-neutral-100 transition-colors text-sm outline-0",
      {
        "bg-neutral-100": selected,
      }
    )}
    onSelect={() => onSelect && onSelect(value)}
    {...remaining}
  >
    {text}
  </DropdownMenu.Item>
);
