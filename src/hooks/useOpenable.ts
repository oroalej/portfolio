import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface UseOpenableProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

const useOpenable = (initialValue: boolean = false): UseOpenableProps => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => setIsOpen((value) => !value), []);

  return {
    isOpen,
    setIsOpen,
    onClose,
    onOpen,
    onToggle,
  };
};

export default useOpenable;
