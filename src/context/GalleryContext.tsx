"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { BaseComponent } from "@/types";
import { useHotkeys } from "react-hotkeys-hook";

interface GalleryContextProps {
  setList: (value: any[]) => void;
  setSelectedIndex: (value: number) => void;
  selectedIndex?: number | null;
  list?: unknown[];
  selectedItem: Record<string, any>;
  onNext: () => void;
  onPrev: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export interface GalleryItem {
  storage_file_path: string;
  name: string;
}

const GalleryContext = createContext<GalleryContextProps>({
  setList: () => {},
  setSelectedIndex: () => {},
  onNext: () => {},
  onPrev: () => {},
  selectedItem: {},
});

export const useGalleryContext = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }: BaseComponent) => {
  const [list, setList] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= list.length - 1;
  const selectedItem = list?.[selectedIndex] ?? null;

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
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
