import {HTMLAttributes} from "react";
import classNames from "classnames";
import {BaseComponent} from "@/types";

export const BaseSkeletonLoader = (props: HTMLAttributes<HTMLDivElement>) => {
    const {className, ...remaining} = props;

    return (
        <span
            className={classNames(
                "animate-pulse min-h-[1rem] bg-gray-300 block",
                className,
            )}
            {...remaining}
        />
    );
};

interface ImageSkeletonLoaderProps {
    aspectRatio?: string
}

export const ImageSkeletonLoader = ({aspectRatio = "1/1"}: ImageSkeletonLoaderProps) => (
    <BaseSkeletonLoader
        className="w-full h-full"
        style={{aspectRatio: aspectRatio}}
    />
)

export const TextSkeletonLoader = ({className}: Pick<BaseComponent, "className">) => (
    <BaseSkeletonLoader
        className={["h-5", className].join(" ")}
    />
)
