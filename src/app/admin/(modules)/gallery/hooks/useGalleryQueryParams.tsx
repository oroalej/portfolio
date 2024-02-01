"use client";

// import { useQueryState } from "next-usequerystate";
import { createSerializer, parseAsString } from "nuqs/parsers";

export const serializer = createSerializer({
  q: parseAsString,
  category_id: parseAsString,
});

export const UseGalleryQueryParams = () => {
  // const [query] = useQueryState("q", {
  //   history: "push",
  // });
  //
  // const [categoryId] = useQueryState("category_id", {
  //   history: "push",
  // });

  return serializer({
    q: null,
    category_id: null,
  });
};
