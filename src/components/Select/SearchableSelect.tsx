"use client";

import { Button, FormErrorMessage, SelectItem } from "@/components";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useOpenable } from "@/hooks";
import { PiXBold } from "react-icons/pi";
import { find } from "lodash";
import { InputField } from "@/components/Form/InputField";
import classNames from "classnames";
import useClickOutside from "@/hooks/useClickOutside";

interface SearchableSelectItemProps {
  selected?: boolean;
  onSelect: () => void;
  children?: ReactNode;
}

interface SearchableSelectContentProps {
  open?: boolean;
  children?: ReactNode;
}

export interface SearchableSelectProps<Type> {
  value: Type | null;
  options: SelectItem<Type>[];

  onChange: (value: Type) => void;
  onCreate?: (value: string) => void;
  onClear?: () => void;

  error?: string;
  name?: string;
  defaultValue?: Type | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export const SearchableSelectItem = ({
  selected,
  onSelect,
  children,
}: SearchableSelectItemProps) => {
  return (
    <li
      className={classNames(
        "relative select-none rounded py-2 pl-3 pr-9 cursor-pointer hover:bg-neutral-100 transition-colors",
        {
          "bg-neutral-100": selected,
        }
      )}
      onClick={onSelect}
    >
      {children}
    </li>
  );
};

export const SearchableSelectContent = ({
  children,
  open,
}: SearchableSelectContentProps) => {
  return (
    <ul
      className={classNames(
        "absolute z-10 mt-1.5 px-1 space-y-0.5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
        {
          hidden: !open,
        }
      )}
    >
      {children}
    </ul>
  );
};

export const SearchableSelect = <Type extends string | number = string>({
  onChange,
  onCreate,
  onClear,
  options,
  error,
  value,
  defaultValue,
  disabled,
  placeholder,
  name = "searchable-input",
}: SearchableSelectProps<Type>) => {
  const [query, setQuery] = useState<string>("");
  const { isOpen, onOpen, onClose } = useOpenable();
  const ref = useClickOutside({ onTriggered: onClose });

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (query === "") return options;

    return options.filter((option) =>
      option.text.toLowerCase().includes(query.toLowerCase().trim())
    );
  }, [query, options]);

  const doesntHaveExactValue = useMemo(() => {
    return (
      query.length >= 2 &&
      (filteredOptions.length === 0 ||
        !filteredOptions.some(
          (item) => item.text.toLowerCase() === query.toLowerCase().trim()
        ))
    );
  }, [query, filteredOptions]);

  const onSelectHandler = (selected: Type) => {
    onChange(selected);
    onClose();
  };

  const getDisplayValue = useMemo(() => {
    if (!!query) return query;
    if (!!value) return find<SelectItem<any>>(options, { value })?.text || "";

    return "";
  }, [options, value, query]);

  return (
    <div className="relative">
      <div ref={ref}>
        <InputField
          name={name}
          type="text"
          onChange={(event) => {
            setQuery(event.target.value);
            onChange(null as any);
          }}
          onFocus={onOpen}
          value={getDisplayValue}
          disabled={disabled}
          isError={!!error}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          appendActions={
            <div className="flex flex-row items-center gap-1 pl-2 -mr-1.5">
              {onCreate && doesntHaveExactValue && (
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

              {onClear && value !== defaultValue && (
                <Button
                  variant="plain"
                  color="secondary"
                  size="extra-small"
                  rounded
                  onClick={() => {
                    onClear();
                    setQuery("");
                  }}
                >
                  <PiXBold />
                </Button>
              )}
            </div>
          }
        />

        <SearchableSelectContent open={isOpen}>
          {filteredOptions.length ? (
            filteredOptions.map((item, index) => (
              <SearchableSelectItem
                key={`searchable-select-${item.text}-${index}`}
                onSelect={() => onSelectHandler(item.value)}
                selected={value === item.value}
              >
                {item.text}
              </SearchableSelectItem>
            ))
          ) : (
            <li className="cursor-default select-none py-2 px-3">No result</li>
          )}
        </SearchableSelectContent>
      </div>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};
