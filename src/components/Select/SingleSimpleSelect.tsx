"use client";

import { Listbox } from "@headlessui/react";
import { BaseComponent } from "@/types";
import { FormErrorMessage } from "@/components";
import { PiXBold } from "react-icons/pi";
import { Fragment } from "react";
import classNames from "classnames";

export interface SelectItem<Type> {
  value: Type;
  text: string;
}

export interface SingleSelectProps<Type, OptionType> {
  value?: Type;
  defaultValue?: Type;

  options: OptionType[];
  optionValue?: keyof OptionType & string;
  optionText?: keyof OptionType & string;

  onChange(value: Type): void;

  placeholder?: string;
  error?: string;
  clearable?: boolean;
}

export interface SelectItemProps extends SelectItem<string> {
  selected?: boolean;
}

export interface SelectButtonProps extends BaseComponent {
  clearable?: boolean;
  isChanged?: boolean;
  isError?: boolean;
  isOpen?: boolean;
  onReset?: () => void;
}

export const SelectButton = (props: SelectButtonProps) => {
  const {
    children,
    isChanged,
    onReset,
    clearable = false,
    isError = false,
    isOpen = false,
  } = props;

  return (
    <div
      className={classNames(
        "flex flex-row justify-between items-stretch relative border min-w-[5rem] w-full min-h-[40px] gap-2 rounded-md text-sm",
        [
          isError
            ? "border-red-600 text-red-600"
            : "border-neutral-200 text-neutral-700",
          isOpen
            ? isError
              ? "ring-1 ring-red-600"
              : "ring-2 ring-neutral-600"
            : "",
        ]
      )}
    >
      <Listbox.Button className="grow text-left block relative px-3 py-2">
        {children}
      </Listbox.Button>

      {clearable && isChanged && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 outline-none text-neutral-700 cursor-pointer shrink-0 h-full p-3"
          onClick={onReset}
        >
          <PiXBold />
        </button>
      )}
    </div>
  );
};

export const SelectContent = ({ children }: BaseComponent) => (
  <Listbox.Options className="absolute z-10 mt-1.5 px-1 space-y-0.5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    {children}
  </Listbox.Options>
);

export const SelectItem = (props: SelectItemProps) => {
  const { value, text, selected } = props;

  return (
    <Listbox.Option
      value={value}
      className={classNames(
        "relative select-none rounded py-2 pl-3 pr-9 cursor-pointer hover:bg-neutral-100 transition-colors text-sm",
        {
          "bg-neutral-100": selected,
        }
      )}
    >
      {text}
    </Listbox.Option>
  );
};

export const SingleSimpleSelect = <
  ValueType extends string | number = number,
  OptionItem extends {} = SelectItem<ValueType>
>({
  onChange,
  options,
  error,
  clearable,
  value,
  placeholder,
  optionValue = "text" as any,
  optionText = "value" as any,
  defaultValue = undefined,
}: SingleSelectProps<ValueType, OptionItem>) => {
  const selectedItem = options
    .filter((item) => item?.[optionValue as keyof OptionItem] == value)
    .pop() as OptionItem;

  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <Fragment>
            <SelectButton
              clearable={clearable}
              isChanged={value !== defaultValue}
              isError={!!error}
              isOpen={open}
              onReset={() => onChange(defaultValue as any)}
            >
              {selectedItem?.[optionText as keyof OptionItem] ||
                placeholder ||
                ""}
            </SelectButton>

            <SelectContent>
              {options.map((item, index) => {
                const itemValue =
                  item?.[optionValue as keyof OptionItem] ?? undefined;

                return (
                  <SelectItem
                    key={`single-select-${itemValue}-${index}`}
                    text={
                      item[optionText as keyof OptionItem] as unknown as string
                    }
                    value={itemValue as any}
                    selected={itemValue === value}
                  />
                );
              })}
            </SelectContent>
          </Fragment>
        )}
      </Listbox>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};
