"use client";

import {DetailedHTMLProps, forwardRef, HTMLAttributes} from "react";
import classNames from "classnames";

export interface CardRootProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rounded?: boolean
}

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>((props, ref) => {
    const {children, className, rounded, ...remaining} = props;

    return (
        <div ref={ref} className={classNames("relative block bg-white", className, {
            'rounded-md': rounded
        })} {...remaining}>
            {children}
        </div>
    )
});

CardRoot.displayName = "CardRoot"

export const CardBody = ({children, className, ...remaining}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("p-4", className)} {...remaining}>
            {children}
        </div>
    )
}

export const CardFooter = ({children, className, ...remaining}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("p-4 flex flex-row", className)} {...remaining}>
            {children}
        </div>
    )
}

export const CardHeader = ({children, className, ...remaining}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("px-4 pt-4 pb-5", className)} {...remaining}>
            {children}
        </div>
    )
}

export const CardTitle = ({children, className, ...remaining}: HTMLAttributes<HTMLHeadElement>) => {
    return (
        <h3 className={classNames("text-xl text-neutral-700", className)} {...remaining}>{children}</h3>
    )
}
