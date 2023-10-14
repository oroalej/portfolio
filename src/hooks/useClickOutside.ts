"use client";

import {useEffect, useRef} from "react";

interface clickOutsideProps {
    onTriggered: () => void
}

const useClickOutside = ({onTriggered}: clickOutsideProps) => {
    const ref = useRef(null)

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !(ref.current as any).contains(e.target)) {
                onTriggered();
            }
        }

        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);

    return ref;
}

export default useClickOutside;
