import {SelectItem} from "@/components";
import {capitalize} from "lodash";

export const kebabCase = (...value: string[]) => {
    return value.join("-").replaceAll(" ", '-')
}

export const removeEmptyValues = (data: Record<string, any>): Record<string, string> => {
    return Object.keys(data).reduce((filteredObj, key) => {
        const value = (data as any)[key];

        if (value !== null && value !== undefined && value !== '') {
            (filteredObj as any)[key] = value;
        }
        return filteredObj;
    }, {});
}

export const titleCase = (value: string) => {
    return value.toLowerCase().split(" ")
        .map(capitalize)
        .join(" ")
}

export const SelectDataFormatter = <ValueType extends string | number = string, >(data: ValueType[]): SelectItem<ValueType>[] => {
    return data.map(item => ({
        text: item.toString(),
        value: item
    }))
}
