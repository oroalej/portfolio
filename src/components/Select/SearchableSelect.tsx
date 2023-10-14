"use client";

import classNames from "classnames";
import {FormErrorMessage, SelectItem} from "@/components";
import {ReactNode, useEffect, useState} from "react";
import {useOpenable} from "@/hooks";
import useClickOutside from "@/hooks/useClickOutside";
import {PiXBold} from "react-icons/pi";
import {find} from "lodash";

export interface SearchableSelectProps<Type> {
    value: Type;
    options: SelectItem<Type>[];

    onChange(value: Type): void;

    error?: string;
    defaultValue?: Type | null | undefined;
    clearable?: boolean
}

interface SearchableSelectItemProps {
    selected?: boolean;
    onSelect: () => void;
    children?: ReactNode
}

interface SearchableSelectContentProps {
    open?: boolean;
    children?: ReactNode;
}


const SearchableSelectItem = ({selected, onSelect, children}: SearchableSelectItemProps) => {
    return (
        <li
            className={classNames("relative cursor-default select-none rounded py-2 pl-3 pr-9 cursor-pointer hover:bg-neutral-100 transition-colors", {
                "bg-neutral-100": selected
            })}
            onClick={onSelect}
        >
            {children}
        </li>
    )
}

const SearchableSelectContent = ({children, open}: SearchableSelectContentProps) => {
    return (
        <ul
            className={classNames("absolute z-10 mt-1.5 px-1 space-y-0.5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm", {
                "hidden": !open
            })}
        >
            {children}
        </ul>
    )
}

export const SearchableSelect = <ValueType extends string | number = number, >(props: SearchableSelectProps<ValueType>) => {
    const {onChange, options, error, value, clearable, defaultValue} = props;
    const [query, setQuery] = useState<string>((value || "").toString())
    const {isOpen, onOpen, onClose} = useOpenable();
    const ref = useClickOutside({onTriggered: onClose})

    useEffect(() => {
        if (!isOpen) setQuery("")
    }, [isOpen])

    const filteredOptions = query === '' ?
        options :
        options.filter(option => option.text.toLowerCase().includes(query.toLowerCase()));

    const onSelectHandler = (value: ValueType) => {
        onChange(value);
        onClose();
    }

    const getDisplayValue = (): string => {
        if (query) return query;
        if (value) return find<SelectItem<any>>(options, {value})?.text || ""

        return "";
    }

    return (
        <div className="relative">
            <div ref={ref}>
                <div className="relative">
                    <input
                        name="searchable-input"
                        type="text"
                        className={classNames("border min-w-[24rem] w-full min-h-[46px] gap-2 outline-none px-3 py-2.5 outline-none", [
                            !!error ? "focus:ring-1 border-red-600 text-red-600 ring-red-600" : "focus:ring-2 border-neutral-200 text-neutral-600 ring-neutral-600"
                        ])}
                        onChange={(event) => {
                            setQuery(event.target.value)
                            onChange(null as any)
                        }}
                        onFocus={onOpen}
                        value={getDisplayValue()}
                    />

                    {clearable && value !== defaultValue && (
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 outline-none text-neutral-700 cursor-pointer shrink-0 h-full p-3"
                            onClick={() => onChange(defaultValue as any)}>
                            <PiXBold/>
                        </button>
                    )}
                </div>

                <SearchableSelectContent open={isOpen}>
                    {filteredOptions.length ? filteredOptions.map((item, index) => (
                        <SearchableSelectItem
                            key={`searchable-select-${item.text}-${index}`}
                            onSelect={() => onSelectHandler(item.value)}
                            selected={value === item.value}
                        >
                            {item.text}
                        </SearchableSelectItem>
                    )) : (
                        <li className="cursor-default select-none py-2 px-3">
                            No result
                        </li>
                    )}
                </SearchableSelectContent>
            </div>

            {!!error && (
                <FormErrorMessage>{error}</FormErrorMessage>
            )}
        </div>
    )
}
