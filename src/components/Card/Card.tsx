import {HTMLAttributes} from "react";
import classNames from "classnames";

export const CardRoot = ({children, className, ...remaining}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={classNames("relative block bg-white", className)} {...remaining}>
            {children}
        </div>
    )
}

export const CardBody = ({children, className, ...remaining}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className="p-4" {...remaining}>
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
        <div className={classNames("px-4 pt-4 pb-6", className)} {...remaining}>
            {children}
        </div>
    )
}

export const CardTitle = ({children, className, ...remaining}: HTMLAttributes<HTMLHeadElement>) => {
    return (
        <h3 className={classNames("text-xl text-neutral-700", className)} {...remaining}>{children}</h3>
    )
}
