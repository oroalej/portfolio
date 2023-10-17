"use client";

import classNames from "classnames";
import {Button, FormErrorMessage, SelectItem} from "@/components";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {useOpenable} from "@/hooks";
import useClickOutside from "@/hooks/useClickOutside";
import {PiXBold} from "react-icons/pi";
import {find} from "lodash";

export interface SearchableSelectProps<Type> {
    value: Type;
    options: SelectItem<Type>[];

    onChange: (value: Type) => void;
    onCreate?: (value: string) => void;

    error?: string;
    name?: string;
    defaultValue?: Type | null | undefined;
    clearable?: boolean;
    disabled?: boolean;
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

const SearchableSelectItem = ({
    selected,
    onSelect,
    children
}: SearchableSelectItemProps) => {
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
    const {
        onChange,
        onCreate,
        options,
        error,
        value,
        clearable,
        defaultValue,
        disabled,
        name = "searchable-input"
    } = props;
    const [query, setQuery] = useState<string>((value || "").toString())
    const {isOpen, onOpen, onClose} = useOpenable();
    const ref = useClickOutside({onTriggered: onClose})

    useEffect(() => {
        if (!isOpen) setQuery("")
    }, [isOpen])

    const filteredOptions = useMemo(() => {
        if (query === '')
            return options;

        return options.filter(option => option.text.toLowerCase().includes(query.toLowerCase().trim()))
    }, [query, options])

    const onSelectHandler = (value: ValueType) => {
        onChange(value);
        onClose();
    }

    const getDisplayValue = useMemo(() => {
        if (!!query) return query;
        if (!!value) return find<SelectItem<any>>(options, {value})?.text || ""

        return "";
    }, [options, value, query])

    return (
        <div className="relative">
            <div ref={ref}>
                <div
                    className={classNames("relative border min-w-[12rem] w-full min-h-[40px] gap-2 outline-none flex flex-row items-center justify-between text-sm", [
                        !!error ? "ring-1 border-red-600 text-red-600 ring-red-600" : "",
                        isOpen && !error ? "ring-2 ring-neutral-800" : "",
                        disabled && "pointer-events-none bg-neutral-50"
                    ])}>

                    <input
                        name={name}
                        type="text"
                        className="outline-none h-[40px] pl-3 grow bg-transparent overflow-hidden"
                        onChange={(event) => {
                            setQuery(event.target.value)
                            onChange(null as any)
                        }}
                        onFocus={onOpen}
                        value={getDisplayValue}
                    />

                    <div className="flex flex-row items-center gap-0.5 pr-2">
                        {!!(onCreate && query.length >= 2 && filteredOptions.length === 0) && (
                            <Button
                                rounded
                                size="extra-small"
                                color="dark"
                                onClick={() => {
                                    onCreate(query);
                                    setQuery("");
                                }}
                            >
                                Create
                            </Button>
                        )}

                        {clearable && (value !== defaultValue) && (
                            <button
                                className="outline-none text-neutral-700 cursor-pointer shrink-0 h-full p-2.5"
                                onClick={() => {
                                    onChange(defaultValue as any)
                                    setQuery("")
                                }}>
                                <PiXBold/>
                            </button>
                        )}
                    </div>
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
