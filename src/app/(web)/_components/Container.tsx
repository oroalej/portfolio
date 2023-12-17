import { BaseComponent } from "@/types";
import classNames from "classnames";
import { HTMLAttributes } from "react";

const Container = ({
  children,
  className,
  ...remaining
}: BaseComponent & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames("max-w-screen-xl px-4 mx-auto", className)}
    {...remaining}
  >
    {children}
  </div>
);

export default Container;
