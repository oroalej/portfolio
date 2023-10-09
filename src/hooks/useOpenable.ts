import {useState} from "react";

const useOpenable = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  const onToggle = () => setIsOpen(() => !isOpen);

  return {
    isOpen,
    setIsOpen,
    onClose,
    onOpen,
    onToggle
  }
}

export default useOpenable;
