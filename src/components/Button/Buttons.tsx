import classNames from "classnames";
import {HTMLAttributes} from "react";

export const ProjectButton = ({className, children, ...remaining}: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...remaining}
            className={classNames("hover:bg-neutral-800 active:bg-neutral-800 active:bg-opacity-80 bg-neutral-800 transition-colors px-4 py-2 rounded-md", className)}>
            {children}
        </button>
    )
}

