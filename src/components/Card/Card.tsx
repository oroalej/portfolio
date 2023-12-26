"use client";

import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import classNames from "classnames";

export interface CardRootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rounded?: boolean;
}

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  (props, ref) => {
    const { children, className, rounded = false, ...remaining } = props;

    return (
      <div
        ref={ref}
        className={classNames(
          "relative block bg-white dark:bg-neutral-800",
          className,
          {
            "rounded-md [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md":
              rounded,
          }
        )}
        {...remaining}
      >
        {children}
      </div>
    );
  }
);

CardRoot.displayName = "CardRoot";

export const CardBody = ({
  children,
  className,
  ...remaining
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={classNames("p-4", className)} {...remaining}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className,
  ...remaining
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames("p-4 flex flex-row gap-3", className)}
      {...remaining}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className,
  ...remaining
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={classNames(className, "p-4")} {...remaining}>
      {children}
    </div>
  );
};

interface CardTitle extends HTMLAttributes<HTMLHeadElement> {
  icon?: ReactNode;
}

export const CardTitle = ({
  children,
  className,
  icon: Icon,
  ...remaining
}: CardTitle) => {
  return (
    <h2
      className={classNames(
        "flex flex-row gap-2.5 items-center text-neutral-700",
        className
      )}
      {...remaining}
    >
      {Icon && <span className="text-xl text-neutral-700 mt-0.5">{Icon}</span>}
      <span className="text-lg font-bold break-words w-auto pl-0 overflow-hidden leading-snug">
        {children}
      </span>
    </h2>
  );
};
