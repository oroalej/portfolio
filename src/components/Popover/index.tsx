"use client";

import * as PopoverUI from "@radix-ui/react-popover";
import { PopoverContentProps } from "@radix-ui/react-popover";
import * as React from "react";
import { RefAttributes } from "react";
import { BaseComponent } from "@/types";
import { CardRoot } from "@/components";

export const PopoverRoot = ({ children }: BaseComponent) => {
  return <PopoverUI.Root>{children}</PopoverUI.Root>;
};

export const PopoverTrigger = ({ children, className }: BaseComponent) => (
  <PopoverUI.Trigger
    className={className}
    // className="border border-neutral-200 hover:bg-neutral-100 transition-colors pl-2.5 pr-3.5 h-full inline-flex items-center justify-center cursor-pointer rounded-e-md active:bg-neutral-200/50 open:bg-neutral-100 open:ring-2 open:ring-neutral-800 open:z-[1]"
    // data-tooltip-id="admin-tooltip"
    // data-tooltip-content="Filters"
    // data-tooltip-place="bottom"
  >
    {children}
    {/*<VscSettings className="text-lg text-neutral-600 hover:text-neutral-800" />*/}
  </PopoverUI.Trigger>
);

interface PopoverContent
  extends PopoverContentProps,
    RefAttributes<HTMLDivElement> {}

export const PopoverContent = ({
  children,
  align = "center",
  sideOffset = 8,
  ...props
}: PopoverContent) => (
  <PopoverUI.Portal>
    <PopoverUI.Content {...props} align={align} sideOffset={sideOffset}>
      <CardRoot
        rounded
        className="drop-shadow-xl border border-neutral-100 rounded-lg"
      >
        {children}
      </CardRoot>
    </PopoverUI.Content>
  </PopoverUI.Portal>
);
