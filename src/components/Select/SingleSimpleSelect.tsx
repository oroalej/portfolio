import { Dispatch, SetStateAction } from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@/components/Select/Select";

import { type SelectItem as SelectItemType } from "@/components/Select/Select";
import { FormErrorMessage } from "@/components";

export interface SingleSelectProps<Type, OptionType> {
  value?: Type;
  defaultValue?: Type;

  options: OptionType[];
  optionValue?: keyof OptionType & string;
  optionText?: keyof OptionType & string;

  onChange: (value: Type) => void | Dispatch<SetStateAction<Type>>;

  placeholder?: string;
  error?: string;
  clearable?: boolean;
}

export const SingleSimpleSelect = <
  ValueType extends string | number | null = number | null,
  OptionItem extends {} = SelectItemType<ValueType>
>({
  onChange,
  options,
  error,
  clearable,
  value,
  placeholder,
  defaultValue,
  optionValue = "value" as any,
  optionText = "text" as any,
}: SingleSelectProps<ValueType, OptionItem>) => {
  const activeValue = value ?? defaultValue;
  const SelectedItem = options.find(
    (item) => (item?.[optionValue] as unknown as ValueType) === activeValue
  );

  return (
    <div className="relative">
      <SelectRoot>
        <SelectTrigger
          isError={!!error}
          clearable={clearable}
          isChanged={defaultValue !== value}
          onReset={() => onChange(defaultValue as ValueType)}
        >
          {SelectedItem?.[optionText] ?? placeholder}
        </SelectTrigger>
        <SelectContent>
          {!!options.length ? (
            options.map((item, index) => (
              <SelectItem
                key={`simple-single-select-${item?.[optionValue] ?? index}`}
                value={item[optionValue]}
                text={(item?.[optionText] || "") as string}
                onSelect={() =>
                  onChange(item[optionValue] as unknown as ValueType)
                }
                selected={
                  activeValue === (item[optionValue] as unknown as ValueType)
                }
              />
            ))
          ) : (
            <span className="block select-none rounded py-2 pl-3 pr-9 text-sm">
              No result
            </span>
          )}
        </SelectContent>
      </SelectRoot>

      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};
