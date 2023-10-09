import {ReactNode} from "react";

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface BaseComponent {
    children?: ReactNode;
    className?: string;
}
