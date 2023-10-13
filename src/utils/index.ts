import {SelectItem} from "@/components";

export const kebabCase = (...value: string[]) => {
    return value.join("-").replaceAll(" ", '-')
}

export const SelectDataFormatter = <ValueType extends string | number = string, >(data: ValueType[]): SelectItem<ValueType>[] => {
    return data.map(item => ({
        text: item.toString(),
        value: item
    }))
}
