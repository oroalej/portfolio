import {ReactNode} from "react";
import {Database} from "@/types/supabase";

export type ValueOf<T> = T[keyof T];
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

export type Variants = "default" | "text" | "plain" | "outlined";
export type Colors = "primary" | "secondary" | "danger" | "warning" | "success" | "light" | "dark";
export type Sizes = "extra-small" | "small" | "default" | "large" | "extra-large";
export type SortTypes = "asc" | "desc";

export interface BaseComponent {
    children?: ReactNode;
    className?: string;
}

export interface Paginatable {
    page?: number;
    per_page?: number;
}

export interface Sortable<SortableColumns> {
    sort?: {
        column: keyof SortableColumns,
        order: SortTypes
    }[];
}

export interface Filterable<FilterableColumns> {
    filter?: Partial<Record<keyof FilterableColumns, unknown>>
}
