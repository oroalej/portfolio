"use client";

import {
  Button,
  FormErrorMessage,
  SearchableSelectContent,
  SearchableSelectItem,
  SelectItem,
} from "@/components";
import { useEffect, useMemo, useState } from "react";
import { useOpenable } from "@/hooks";
import { PiXBold } from "react-icons/pi";
import { find } from "lodash";
import { InputField } from "@/components/Form/InputField";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/useClickOutside";

export interface SearchableMultiSelectProps {
  value: string[];
  options: SelectItem<string>[];

  onChange: (value: string[]) => void;
  onCreate?: (value: string) => void;
  onClear?: () => void;

  error?: string;
  name?: string;
  defaultValue?: string[];
  disabled?: boolean;
  placeholder?: string;
}

export const MultiSearchableSelect = ({
  onChange,
  onCreate,
  onClear,
  options,
  error,
  value,
  defaultValue,
  disabled,
  placeholder,
  name = "multi-searchable-input",
}: SearchableMultiSelectProps) => {
  const [query, setQuery] = useState<string>("");
  const { isOpen, onOpen, onClose } = useOpenable();
  const ref = useClickOutside({ onTriggered: onClose });

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    let filtered = options;

    if (!!value.length) {
      filtered = filtered.filter((option) => !value.includes(option.value));
    }

    if (!!query) {
      filtered = filtered.filter((option) =>
        option.text.toLowerCase().includes(query.toLowerCase().trim())
      );
    }

    return filtered;
  }, [query, options]);

  return (
    <div className="relative">
      <div ref={ref}>
        <InputField
          name={name}
          type="text"
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onFocus={onOpen}
          value={query}
          disabled={disabled}
          isError={!!error}
          placeholder={placeholder}
          appendActions={
            <div className="flex flex-row items-center gap-1 pl-2 -mr-1.5">
              {!!(
                onCreate &&
                query.length >= 2 &&
                filteredOptions.length === 0
              ) && (
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

              {onClear && !!value.length && (
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
                onSelect={() => onChange([item.value, ...value])}
                selected={value?.includes(item.value)}
              >
                {item.text}
              </SearchableSelectItem>
            ))
          ) : (
            <li className="cursor-default select-none py-2 px-3">No result</li>
          )}
        </SearchableSelectContent>
      </div>

      {!!value?.length && (
        <div className="flex flex-row gap-1 mt-1.5 flex-wrap">
          {value?.map((id) => (
            <div
              key={`multi-select-${id}`}
              className="outline-none bg-neutral-200 px-1.5 py-1 rounded inline-flex items-center justify-center gap-1 text-neutral-700 text-xs"
            >
              <span>
                {(find(options, { value: id }) as SelectItem<string>)?.text ??
                  ""}
              </span>
              <button
                type="button"
                onClick={() =>
                  onChange(value.filter((itemId) => id !== itemId))
                }
              >
                <AiOutlineClose size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};
