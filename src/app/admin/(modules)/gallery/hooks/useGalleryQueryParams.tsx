"use client";

import { useQueryState } from "next-usequerystate";
import { removeEmptyValues } from "@/utils";

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
    return "?" + new URLSearchParams(searchParams).toString();
  }

  return "";
};
