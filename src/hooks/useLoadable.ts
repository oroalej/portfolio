import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface UseLoadableResult {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  startLoading: () => void;
  endLoading: () => void;
}

const useLoadable = (initialValue: boolean = false): UseLoadableResult => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const endLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    endLoading,
  };
};

export default useLoadable;
