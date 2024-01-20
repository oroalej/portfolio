import { Dispatch, SetStateAction, useState } from "react";

export interface useOpenableProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

const useOpenable = (initialValue: boolean = false): useOpenableProps => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen(() => !isOpen);

  return {
    isOpen,
    setIsOpen,
    onClose,
    onOpen,
    onToggle,
  };
};

export default useOpenable;
