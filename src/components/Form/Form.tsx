"use client";

import {
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import classNames from "classnames";
import { BaseComponent } from "@/types";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  required?: boolean;
}

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
}

export const FormErrorMessage = ({ children }: BaseComponent) => (
  <span className="text-red-600 mt-1.5 text-xs block">{children}</span>
);

export const Label = (props: LabelProps) => {
  const { required, className, children, htmlFor, ...remaining } = props;

  const innerChild = (
    <Fragment>
      <span className="text-neutral-600 dark:text-white">{children}</span>

      {required && <span className="text-red-700 ml-1 leading-6">*</span>}
    </Fragment>
  );

  if (htmlFor) {
    return (
      <label
        {...remaining}
        htmlFor={htmlFor}
        className={classNames("text-sm inline-block mb-1", className)}
      >
        {innerChild}
      </label>
    );
  }

  return (
    <span
      {...remaining}
      className={classNames("text-sm inline-block mb-1", className)}
    >
      {innerChild}
    </span>
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, children, error, ...remaining } = props;

  return (
    <Fragment>
      <input
        ref={ref}
        className={classNames(
          "block relative border border-solid px-3 py-2 min-w-[12rem] w-full outline-none focus:z-10",
          className,
          [
            !!error
              ? "focus:ring-1 border-red-600 text-red-600 ring-red-600"
              : "focus:ring-2 border-neutral-200 text-neutral-600 ring-neutral-600",
          ]
        )}
        {...remaining}
      />

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </Fragment>
  );
});

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, children, error, ...remaining } = props;

    return (
      <Fragment>
        <textarea
          ref={ref}
          className={classNames(
            "block relative border border-solid px-3 py-2.5 w-full outline-none rounded-md",
            className,
            [
              !!error
                ? "focus:ring-1 border-red-600 text-red-600 ring-red-600"
                : "focus:ring-2 border-neutral-200 text-neutral-600 ring-neutral-600",
            ]
          )}
          {...remaining}
        />

        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Fragment>
    );
  }
);

Textarea.displayName = "Textarea";

export const FormGroup = ({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames("mb-1.5 lg:mb-4 relative block w-full", className)}
    >
      {children}
    </div>
  );
};

export const InputGroup = ({ children, className }: BaseComponent) => (
  <div
    className={classNames(
      className,
      "flex flex-row items-center [&>*:first-child:not(:only-child)]:rounded-e-none [&>*:not(:last-child):not(:first-child)]:rounded-none [&>*:not(:last-child)]:border-e-0 [&>*:last-child:not(:only-child)]:rounded-s-none [&>[data-input]]:flex-1 rounded-lg h-[40px] w-full"
    )}
  >
    {children}
  </div>
);

export const InputGroupText = ({
  children,
  className,
  ...remaining
}: BaseComponent) => (
  <span
    className={classNames(
      className,
      "inline-flex px-3 items-center justify-center rounded-md h-[40px] bg-neutral-100 border border-neutral-200 text-neutral-600 text-[15px] leading-normal"
    )}
    {...remaining}
  >
    {children}
  </span>
);
