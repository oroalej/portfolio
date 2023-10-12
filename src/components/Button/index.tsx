"use client";

import classNames from "classnames";
import {ButtonHTMLAttributes, forwardRef, Fragment, HTMLProps, Ref} from "react";
import {Colors, Variants} from "@/types";
import {FaSpinner} from "react-icons/fa6";
import type {LinkProps as NextLinkProps} from "next/link";
import Link from "next/link";

interface BaseButtonProps {
    isLoading?: boolean;
    variant?: Exclude<Variants, "outlined">;
    color?: Exclude<Colors, "light" | "success">;
    block?: boolean;
    rounded?: boolean;
    icon?: boolean;
}

export interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {

}

export interface LinkProps extends BaseButtonProps, NextLinkProps, Omit<HTMLProps<HTMLAnchorElement>, "color" | "as" | "href" | "ref"> {

}

type ButtonOrLinkProps = ButtonProps | LinkProps;

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

const getButtonClasses = ({
    className,
    block,
    rounded,
    icon,
    variant = "default",
    color = 'dark'
}: ButtonOrLinkProps) => classNames("relative transition-colors hover:bg-opacity-90 active:bg-opacity-100 disabled:cursor-default disabled:bg-opacity-75 duration-200 cursor-pointer",
    [
        icon ? "aspect-square p-2 text-[15px]" : "px-4 py-2",
        block ? "w-full" : "inline-block"
    ],
    {'rounded-md': rounded},
    styles[color][variant], className
)

const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(({children, ...props}, ref) => (
    <Link {...props} ref={ref} className={getButtonClasses(props)}>
        {children}
    </Link>
))

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    disabled,
    isLoading,
    ...props
}, ref) => (
    <button
        {...props}
        ref={ref as Ref<HTMLButtonElement>}
        className={getButtonClasses(props)}
        disabled={disabled || isLoading}
    >
        {children}
    </button>
))

export const Button = forwardRef<HTMLElement, ButtonOrLinkProps>((props, ref) => {
    const {isLoading, children} = props;

    const innerChild = <Fragment>
        {isLoading && (
            <span className="absolute inset-0 z-10 flex items-center justify-center">
                <FaSpinner className="animate-spin ease-in-out" size={22}/>
            </span>
        )}

        <span className={isLoading ? "invisible" : ""}>
            {children}
        </span>
    </Fragment>

    if ('href' in props) {
        return (
            <LinkComponent {...(props as LinkProps)} ref={ref as Ref<HTMLAnchorElement>}>
                {innerChild}
            </LinkComponent>
        );
    }

    return (
        <ButtonComponent {...(props as ButtonProps)} ref={ref as Ref<HTMLButtonElement>}>
            {innerChild}
        </ButtonComponent>
    );
});

ButtonComponent.displayName = "ButtonComponent";
LinkComponent.displayName = "LinkComponent";
Button.displayName = "Button"
