"use client";

import {DetailedHTMLProps, forwardRef, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes} from "react";
import classNames from "classnames";

interface LabelInterface extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    required?: boolean
}

interface InputInterface extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    isError?: boolean
}

export const Label = (props: LabelInterface) => {
    const {required, className, children, ...remaining} = props;

    return (
        <label className={classNames("text-sm block mb-2 text-neutral-600", className)} {...remaining}>
            {children}
        </label>
    )
}

export const Input = forwardRef<HTMLInputElement, InputInterface>((props, ref) => {
    const {className, children, isError, ...remaining} = props;

    return (
        <input
            ref={ref}
            className={classNames("relative border border-solid px-3 py-2.5 min-w-[24rem] w-full", className, [
                isError ? "border-red-700 text-red-700 outline-red-700" : "border-neutral-200 outline-neutral-700"
            ])}
            {...remaining}
        />
    )
})

Input.displayName = "Input"

export const FormGroup = ({className, children}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("mb-4 relative block", className)}>
            {children}
        </div>
    )
}
