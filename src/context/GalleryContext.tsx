"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { BaseComponent, Tables } from "@/types";
import { useHotkeys } from "react-hotkeys-hook";

interface GalleryContextProps {
  setList: (value: GalleryItem[]) => void;
  setSelectedIndex: (value: number) => void;
  selectedIndex?: number | null;
  list: GalleryItem[];
  selectedItem: Record<string, any>;
  onNext: () => void;
  onPrev: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  total: number;
}

export interface GalleryItem
  extends Pick<Tables<"files">, "storage_file_path">,
    Required<Pick<Tables<"files">, "width" | "height">> {
  name: string;
}

const GalleryContext = createContext<GalleryContextProps>({
  setList: () => {},
  setSelectedIndex: () => {},
  onNext: () => {},
  onPrev: () => {},
  selectedItem: {},
  total: 1,
  list: [],
});

export const useGalleryContext = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }: BaseComponent) => {
  const [list, setListable] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= list.length - 1;
  const total = list.length;
  const selectedItem = list?.[selectedIndex] ?? null;

  const setList = (value: GalleryItem[]) => {
    setListable(value);
    setSelectedIndex(0);
  };

  const onPrev = useCallback(
    () =>
      setSelectedIndex((prevState) => {
        if (isFirst) return prevState;

        return prevState - 1;
      }),
    [isFirst]
  );

  const onNext = useCallback(
    () =>
      setSelectedIndex((prevState) => {
        if (isLast) return prevState;

        return prevState + 1;
      }),
    [isLast]
  );

  useHotkeys("right", onNext);
  useHotkeys("left", onPrev);

  return (
    <GalleryContext.Provider
      value={{
        setList,
        setSelectedIndex,
        onNext,
        onPrev,
        selectedIndex,
        list,
        selectedItem,
        isFirst,
        isLast,
        total,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
