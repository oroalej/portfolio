"use client";

import { CardRoot } from "@/components";
import { PopoverContentProps, PopoverProps } from "@radix-ui/react-popover";
import { RefAttributes } from "react";
import { BaseComponent } from "@/types";
import * as React from "react";
import * as PopoverUI from "@radix-ui/react-popover";

export const PopoverRoot = ({
  children,
  ...remaining
}: BaseComponent & PopoverProps) => {
  return <PopoverUI.Root {...remaining}>{children}</PopoverUI.Root>;
};

export const PopoverTrigger = ({ children, className }: BaseComponent) => (
  <PopoverUI.Trigger className={className}>{children}</PopoverUI.Trigger>
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
