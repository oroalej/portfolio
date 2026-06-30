import { BaseComponent } from "@/types";
import classNames from "classnames";
import { HTMLAttributes } from "react";

const Container = ({
  children,
  className,
  ...remaining
}: BaseComponent & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classNames(
      "sm:max-w-screen-md lg:max-w-screen-lg mx-auto px-4",
      className
    )}
    {...remaining}
  >
    {children}
  </div>
);

export default Container;
