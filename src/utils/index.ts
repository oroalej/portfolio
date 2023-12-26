import { SelectItem } from "@/components";
import { capitalize } from "lodash";

export const kebabCase = (...value: string[]) => {
  return value.join("-").replaceAll(" ", "-");
};

export const removeEmptyValues = (
  data: Record<string, any>
): Record<string, string> => {
  return Object.keys(data).reduce((filteredObj, key) => {
    const value = (data as any)[key];

    if (value !== null && value !== undefined && value !== "") {
      (filteredObj as any)[key] = value;
    }
    return filteredObj;
  }, {});
};

export const titleCase = (value: string) => {
  return value.toLowerCase().split(" ").map(capitalize).join(" ");
};

export const SelectDataFormatter = <ValueType extends string | number = string>(
  data: ValueType[]
): SelectItem<ValueType>[] => {
  return data.map((item) => ({
    text: item.toString(),
    value: item,
  }));
};

export const durationInMinutes = (minutes: number) => 1000 * 60 * minutes;

export const computeStorageSizeFromByte = (value: number) => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (value < kilobyte) {
    return `${value} B`;
  }

  if (value < megabyte) {
    return `${(value / kilobyte).toFixed(2)} KB`;
  }

  if (value < gigabyte) {
    return `${(value / megabyte).toFixed(2)} MB`;
  }

  return `${(value / gigabyte).toFixed(2)} GB`;
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();
  link.parentNode?.removeChild(link);
};
