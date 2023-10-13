"use client";

import {useCallback, useEffect, useRef} from "react";

interface clickOutsideProps {
    onTriggered: () => void
}

const useClickOutside = ({onTriggered}: clickOutsideProps) => {
    const ref = useRef(null)

    const handleClick = useCallback((e: MouseEvent) => {
        if (ref.current && !(ref.current as any).contains(e.target)) {
            onTriggered();
        }
    }, [ref.current, onTriggered])

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return ref;
}

export default useClickOutside;
