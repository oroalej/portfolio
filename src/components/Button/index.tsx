"use client";

import classNames from "classnames";
import {ButtonHTMLAttributes, forwardRef, HTMLAttributes} from "react";
import {Colors, Variants} from "@/types";
import {FaSpinner} from "react-icons/fa6";

export const ProjectButton = ({className, children, ...remaining}: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...remaining}
            className={classNames("hover:bg-neutral-800 active:bg-neutral-800 active:bg-opacity-80 bg-neutral-800 transition-colors px-4 py-2 rounded-md", className)}>
            {children}
        </button>
    )
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: Exclude<Variants, "outlined">;
    color?: Exclude<Colors, "light" | "success">;
    block?: boolean;
    rounded?: boolean;
    icon?: boolean;
}

const styles = {
    dark: {
        default: "text-white bg-neutral-800",
        text: "text-neutral-800 enabled:hover:bg-neutral-800 enabled:hover:text-white enabled:active:bg-neutral-800 enabled:active:text-white",
        plain: "text-neutral-800 enabled:active:bg-neutral-800 enabled:active:text-white"
    },
    primary: {
        default: "text-white bg-blue-600",
        text: "text-blue-700 enabled:hover:bg-blue-600 enabled:hover:text-white enabled:active:bg-blue-600 enabled:active:text-white",
        plain: "text-blue-700 enabled:active:bg-blue-600 enabled:active:text-white"
    },
    danger: {
        default: "text-white bg-red-600",
        text: "text-red-600 enabled:hover:bg-red-600 enabled:hover:text-white enabled:active:bg-red-600 enabled:active:text-white",
        plain: "text-red-600 enabled:active:bg-red-600 enabled:active:text-white"
    },
    warning: {
        default: "text-neutral-800 bg-yellow-500",
        text: "text-yellow-600 enabled:hover:bg-yellow-500 enabled:hover:text-neutral-800 enabled:active:bg-yellow-500 enabled:active:text-neutral-800",
        plain: "text-yellow-600 enabled:active:bg-yellow-500 enabled:active:text-neutral-800"
    },
    secondary: {
        default: "text-neutral-800 bg-neutral-200",
        text: "text-neutral-800 enabled:hover:bg-neutral-200 enabled:hover:text-neutral-800 enabled:active:bg-neutral-200 enabled:active:text-neutral-800",
        plain: "text-neutral-800 enabled:active:bg-neutral-200 enabled:active:text-neutral-800"
    }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        children,
        className,
        isLoading,
        block,
        disabled,
        rounded,
        icon,
        variant = "default",
        color = 'dark',
        ...remaining
    } = props;

    return (
        <button
            ref={ref}
            {...remaining}
            className={classNames(
                styles[color][variant],
                "relative flex flex-row gap-2 items-center transition-colors hover:bg-opacity-90 active:bg-opacity-100 disabled:cursor-default disabled:bg-opacity-75 duration-200 cursor-pointer",
                [icon ? "aspect-square p-2 text-[15px]": "px-4 py-2"],
                {
                    'w-full': block,
                    'rounded-md': rounded,
                },
                className,
            )}
            disabled={disabled || isLoading}
        >
            {isLoading && (
                <span className="absolute inset-0 z-10 flex items-center justify-center">
                    <FaSpinner className="animate-spin ease-in-out" size={22}/>
                </span>
            )}

            <span className={isLoading ? "invisible" : ""}>
                {children}
            </span>
        </button>
    )
})

Button.displayName = "Button"
