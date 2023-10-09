import {FC, Fragment, ReactNode} from 'react'
import {Dialog as UIDialog, Transition} from '@headlessui/react'

interface DialogInterface {
  children: ReactNode,
  isOpen: boolean,
  onClose: () => void
}

const Dialog: FC<DialogInterface> = (props: DialogInterface) => {
  const {children, isOpen, onClose} = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <UIDialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen h-full text-center">
          <UIDialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </UIDialog>
    </Transition>
  )
}

export default Dialog
