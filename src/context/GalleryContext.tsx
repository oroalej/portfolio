"use client";

import {createContext, useCallback, useContext, useState} from "react";
import {BaseComponent} from "@/types";

interface GalleryContextProps {
    setList: (value: any[]) => void;
    setSelectedIndex: (value: number | null) => void;
    selectedIndex?: number | null;
    list?: any[];
    selectedItem: Record<string, any>;
    onNext: () => void;
    onPrev: () => void;
    isFirst?: boolean;
    isLast?: boolean
}

const GalleryContext = createContext<GalleryContextProps>({
    setList: () => {
    },
    setSelectedIndex: () => {
    },
    onNext: () => {
    },
    onPrev: () => {
    },
    selectedItem: {},
});

export const useGalleryContext = () => useContext(GalleryContext);

export const GalleryProvider = <CollectionType, >({children}: BaseComponent) => {
    const [list, setList] = useState<CollectionType[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const onPrev = useCallback(() => setSelectedIndex(prevState => {
        if (prevState === null) return 0

        return Math.max(0, prevState - 1)
    }), [setSelectedIndex])

    const onNext = useCallback(() => setSelectedIndex(prevState => {
        if (prevState === null) return 0

        return Math.max(0, prevState + 1)
    }), [setSelectedIndex])

    return (
        <GalleryContext.Provider
            value={{
                setList,
                setSelectedIndex,
                onNext,
                onPrev,
                selectedIndex,
                list,
                selectedItem: list[selectedIndex as number] as CollectionType,
                isFirst: selectedIndex === 0,
                isLast: selectedIndex === list.length - 1,
            }}
        >
            {children}
        </GalleryContext.Provider>
    )
};
