import { AiOutlineExpand } from "react-icons/ai";

const ExpandImagePreviewPlaceholder = () => (
  <div className="absolute inset-0 cursor-pointer">
    <div className="inline-flex items-center justify-center h-full w-full bg-black bg-opacity-40 group-hover:opacity-100 transition-all duration-500 opacity-0 group-active:bg-opacity-50 overflow-hidden rounded-md">
      <button className="text-neutral-200 outline-none">
        <AiOutlineExpand size={20} />
      </button>
    </div>
  </div>
);

export default ExpandImagePreviewPlaceholder;
