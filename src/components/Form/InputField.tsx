import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { IconType } from "react-icons";
import classNames from "classnames";
import { BaseSkeletonLoader } from "@/components";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
  appendIcon?: IconType;
  prependIcon?: IconType;
  appendActions?: ReactNode;
  prependActions?: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      isError,
      prependIcon: PrependIcon,
      appendIcon: AppendIcon,
      appendActions: AppendActions,
      prependActions: PrependActions,
      ...remaining
    },
    ref
  ) => {
    return (
      <div
        data-input={true}
        className={classNames(
          className,
          [
            !!isError
              ? "border-red-600 text-red-600 focus-within:ring-red-700"
              : "border-neutral-200 text-neutral-600 focus-within:ring-neutral-800",
          ],
          {
            "bg-neutral-50": remaining.disabled,
          },
          "relative flex flex-nowrap flex-row px-3 items-center justify-center rounded-md h-[40px] focus-within:ring-2 overflow-hidden border border-neutral-200 focus-within:z-[1]"
        )}
      >
        {PrependIcon && (
          <div className="pr-2.5 inline-flex justify-center items-center text-opacity-60 h-full">
            <PrependIcon className="text-lg" />
          </div>
        )}

        {PrependActions && PrependActions}

        <input
          ref={ref}
          type="text"
          className={classNames(
            [
              !!isError
                ? "placeholder:text-red-700"
                : "placeholder:text-neutral-400",
            ],
            "rounded-none outline-none m-0 h-full text-[15px] flex-1 disabled:bg-transparent min-w-0 max-w-full"
          )}
          {...remaining}
        />

        {AppendActions && AppendActions}

        {AppendIcon && (
          <div className="pl-2 inline-flex justify-center items-center text-opacity-60 h-full">
            <AppendIcon className="text-lg" />
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export const InputFieldLoading = () => (
  <BaseSkeletonLoader className="rounded-md" style={{ height: "40px" }} />
);
