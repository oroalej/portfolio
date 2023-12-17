import { Fragment } from "react";
import { Tooltip } from "@/components";
import { Toaster } from "react-hot-toast";
import { BaseComponent } from "@/types";

const WebLayoutRoot = ({ children }: Pick<BaseComponent, "children">) => (
  <Fragment>
    <Tooltip
      id="guest-tooltip"
      place="top"
      className="!bg-neutral-300 !opacity-100 !text-neutral-800 z-[9999]"
    />

    {children}

    <Toaster position="top-right" gutter={8} containerClassName="text-sm" />
  </Fragment>
);

export default WebLayoutRoot;
