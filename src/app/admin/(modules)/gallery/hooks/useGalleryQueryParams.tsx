"use client";

import { useQueryState } from "next-usequerystate";
import { createSerializer, parseAsString } from "nuqs/parsers";
import { removeEmptyValues } from "@/utils";

export const serializer = createSerializer({
  q: parseAsString,
  category_id: parseAsString,
});

export const UseGalleryQueryParams = () => {
  const [query] = useQueryState("q", {
    history: "push",
  });

  const [categoryId] = useQueryState("category_id", {
    history: "push",
  });

  const searchParams =
    removeEmptyValues({
      q: query,
      category_id: categoryId,
    }) ?? {};

  if (Object.keys(searchParams).length) {
    return serializer(searchParams);
  }

  return "";
};
