"use client";

import {PlacesType, Tooltip as TooltipUI} from "react-tooltip";

export interface TooltipProps {
    id: string;
    place?: PlacesType;
    className?: string
}

export const Tooltip = (props: TooltipProps) => {
    const {id, className, place = 'top'} = props;

    return (
        <TooltipUI
            id={id}
            place={place}
            className={className}
        />
    )
}
