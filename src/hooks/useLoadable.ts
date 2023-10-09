import {useState} from "react";

const useLoadable = (initialValue: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialValue)

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    endLoading
  }
}

export default useLoadable;
