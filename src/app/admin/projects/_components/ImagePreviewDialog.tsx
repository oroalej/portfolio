import { Dialog, DialogProps } from "@/components";
import { MdClose } from "react-icons/md";
import { useHotkeys } from "react-hotkeys-hook";
import classNames from "classnames";
import ImagePreviewContainer from "@/app/admin/projects/_components/ImagePreviewContainer";

const ImagePreviewDialog = ({
  isOpen,
  onClose,
}: Required<Omit<DialogProps, "children">>) => {
  useHotkeys(["esc", "escape"], onClose);

  return (
    <Dialog isOpen={isOpen}>
      <div className="relative h-full max-w-[1920px] mx-auto">
        <div className="absolute right-1 top-0 z-10">
          <button
            className={classNames("text-white outline-none p-2 cursor-pointer")}
            onClick={onClose}
          >
            <MdClose size={28} />
          </button>
        </div>

        <ImagePreviewContainer />
      </div>
    </Dialog>
  );
};

export default ImagePreviewDialog;
