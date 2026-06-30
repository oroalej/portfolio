import { useCallback, useEffect, useState } from "react";

interface ElementSize {
  width: number;
  height: number;
}

const initialSize: ElementSize = {
  width: 0,
  height: 0,
};

const useElementSize = <Element extends HTMLElement>() => {
  const [element, setElement] = useState<Element | null>(null);
  const [size, setSize] = useState<ElementSize>(initialSize);

  const ref = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return {
    ref,
    element,
    width: size.width,
    height: size.height,
  };
};

export default useElementSize;
