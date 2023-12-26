"use client";

import * as UIScrollArea from "@radix-ui/react-scroll-area";
import { ScrollAreaScrollbarVisibleProps } from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import { BaseComponent } from "@/types";

export const Scrollbar = ({
  orientation = "vertical",
}: Pick<ScrollAreaScrollbarVisibleProps, "orientation">) => {
  return (
    <UIScrollArea.Scrollbar
      className={classNames(
        "flex select-none touch-none rounded-tr rounded-br bg-gray-200/80 transition-colors hover:bg-gray-200",
        {
          "data-[orientation=horizontal]:h-2.5": orientation === "horizontal",
          "data-[orientation=vertical]:w-2.5": orientation === "vertical",
        }
      )}
      style={{ padding: "3px" }}
      orientation={orientation}
    >
      <UIScrollArea.Thumb
        className="bg-gray-500 rounded-md relative w-2 h-10 "
        style={{ flex: 1 }}
      />
    </UIScrollArea.Scrollbar>
  );
};

export const ScrollViewport = ({ children, className }: BaseComponent) => {
  return (
    <UIScrollArea.Root type="auto">
      <UIScrollArea.Viewport className={className}>
        {children}
      </UIScrollArea.Viewport>
    </UIScrollArea.Root>
  );
};
