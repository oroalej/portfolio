"use client";

import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  forwardRef,
  Fragment,
  HTMLProps,
  ReactNode,
  Ref,
} from "react";
import { Colors, Sizes, Variants } from "@/types";
import { FaSpinner } from "react-icons/fa6";
import type { LinkProps as NextLinkProps } from "next/link";
import Link from "next/link";
import { omit } from "lodash";

export interface BaseButtonProps {
  isLoading?: boolean;
  variant?: Exclude<Variants, "outlined">;
  color?: Exclude<Colors, "light" | "success">;
  size?: Exclude<Sizes, "extra-large">;
  block?: boolean;
  rounded?: boolean;
  icon?: boolean;

  prependIcon?: ReactNode;
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {}

export interface LinkProps
  extends BaseButtonProps,
    NextLinkProps,
    Omit<
      HTMLProps<HTMLAnchorElement>,
      "color" | "as" | "href" | "ref" | "size"
    > {}

type ButtonOrLinkProps = ButtonProps | LinkProps;

const styles = {
  dark: {
    default: "text-white bg-neutral-800",
    text: "text-neutral-800 enabled:hover:bg-neutral-800 enabled:hover:text-white enabled:active:bg-neutral-800 enabled:active:text-white",
    plain:
      "text-neutral-800 enabled:active:bg-neutral-800 enabled:active:text-white",
  },
  primary: {
    default: "text-white bg-blue-600",
    text: "text-blue-700 enabled:hover:bg-blue-600 enabled:hover:text-white enabled:active:bg-blue-600 enabled:active:text-white",
    plain: "text-blue-700 enabled:active:bg-blue-600 enabled:active:text-white",
  },
  danger: {
    default: "text-white bg-red-600",
    text: "text-red-600 enabled:hover:bg-red-600 enabled:hover:text-white enabled:active:bg-red-600 enabled:active:text-white",
    plain: "text-red-600 enabled:active:bg-red-600 enabled:active:text-white",
  },
  warning: {
    default: "text-neutral-800 bg-yellow-500",
    text: "text-yellow-600 enabled:hover:bg-yellow-500 enabled:hover:text-neutral-800 enabled:active:bg-yellow-500 enabled:active:text-neutral-800",
    plain:
      "text-yellow-600 enabled:active:bg-yellow-500 enabled:active:text-neutral-800",
  },
  secondary: {
    default: "text-neutral-800 bg-neutral-200",
    text: "text-neutral-800 enabled:hover:bg-neutral-200 enabled:hover:text-neutral-800 enabled:active:bg-neutral-200 enabled:active:text-neutral-800",
    plain:
      "text-neutral-800 enabled:active:bg-neutral-200 enabled:active:text-neutral-800 dark:text-white",
  },
};

export const sizesClasses = {
  large: "px-4 py-2.5 text-lg",
  default: "px-3.5 py-2 text-base h-[40px]",
  small: "px-3 py-2 text-sm",
  "extra-small": "px-2 py-1 text-xs min-h-[28px]",
};

const getButtonClasses = ({
  className,
  rounded = false,
  block = false,
  icon = false,
  variant = "default",
  size = "default",
  color = "dark",
}: Partial<ButtonOrLinkProps>) =>
  classNames(
    "inline-flex items-center relative transition-colors hover:bg-opacity-90 active:bg-opacity-100 disabled:cursor-default disabled:bg-opacity-75 duration-200 cursor-pointer font-medium whitespace-nowrap",
    {
      "rounded-md": rounded,
      "aspect-square flex flex-row items-center": icon,
      "w-full": block,
    },
    sizesClasses[size],
    styles[color][variant],
    className
  );

const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...props }, ref) => (
    <Link
      {...omit(props, ["rounded", "block", "icon"])}
      ref={ref}
      className={getButtonClasses(props)}
    >
      {children}
    </Link>
  )
);

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, isLoading, ...props }, ref) => (
    <button
      {...omit(props, ["rounded", "block", "icon"])}
      ref={ref as Ref<HTMLButtonElement>}
      className={getButtonClasses(props)}
      disabled={disabled || isLoading}
    >
      {children}
    </button>
  )
);

// TODO: Adjust button to accept icon, accepts prepend and append icon.
export const Button = forwardRef<HTMLButtonElement, ButtonOrLinkProps>(
  (props, ref) => {
    const { isLoading, children } = props;

    const innerChild = (
      <Fragment>
        {isLoading && (
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <FaSpinner className="animate-spin ease-in-out" size={22} />
          </span>
        )}

        <span className={isLoading ? "invisible" : ""}>{children}</span>
      </Fragment>
    );

    if ("href" in props) {
      return (
        <LinkComponent
          {...(props as LinkProps)}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {innerChild}
        </LinkComponent>
      );
    }

    return (
      <ButtonComponent
        {...(props as ButtonProps)}
        ref={ref as Ref<HTMLButtonElement>}
      >
        {innerChild}
      </ButtonComponent>
    );
  }
);

ButtonComponent.displayName = "ButtonComponent";
LinkComponent.displayName = "LinkComponent";
Button.displayName = "Button";
