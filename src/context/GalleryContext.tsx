"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BaseComponent, Tables } from "@/types";
import { useHotkeys } from "react-hotkeys-hook";

interface SetGalleryListOptions {
  shouldResetSelectedIndex?: boolean;
}

interface GalleryContextProps {
  setList: (value: GalleryItem[], options?: SetGalleryListOptions) => void;
  setSelectedIndex: (value: number) => void;
  selectedIndex?: number | null;
  list: GalleryItem[];
  selectedItem: GalleryItem | null;
  onNext: () => void;
  onPrev: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  total: number;
}

export interface GalleryItem
  extends Pick<Tables<"files">, "height" | "storage_file_path" | "width"> {
  name: string;
}

const GalleryContext = createContext<GalleryContextProps>({
  setList: () => {},
  setSelectedIndex: () => {},
  onNext: () => {},
  onPrev: () => {},
  selectedItem: null,
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

  const setList = useCallback(
    (
      value: GalleryItem[],
      { shouldResetSelectedIndex = true }: SetGalleryListOptions = {}
    ) => {
      setListable(value);
      setSelectedIndex((prevState) => {
        if (shouldResetSelectedIndex) return 0;

        return Math.min(prevState, Math.max(value.length - 1, 0));
      });
    },
    []
  );

  const onPrev = useCallback(
    () =>
      setSelectedIndex((prevState) => {
        return Math.max(prevState - 1, 0);
      }),
    []
  );

  const onNext = useCallback(
    () =>
      setSelectedIndex((prevState) => {
        return Math.min(prevState + 1, Math.max(list.length - 1, 0));
      }),
    [list.length]
  );

  useHotkeys("right", onNext);
  useHotkeys("left", onPrev);

  const contextValue = useMemo(
    () => ({
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
    }),
    [
      setList,
      onNext,
      onPrev,
      selectedIndex,
      list,
      selectedItem,
      isFirst,
      isLast,
      total,
    ]
  );

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};
