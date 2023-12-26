import { FauxMenu } from "./index";
import { HTMLAttributes } from "react";
import classNames from "classnames";

interface WindowInterface extends HTMLAttributes<HTMLDivElement> {
  title?: string | undefined;
  theme?: string | undefined;
}

const Window = ({
  children,
  title,
  className,
  ...remaining
}: WindowInterface) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-start flex-1 max-w-screen-xl w-full mx-auto h-full overflow-hidden rounded-lg",
        className
      )}
      {...remaining}
    >
      <div className="flex w-full flex-row px-3 lg:px-4 py-2.5 lg:py-3 justify-between items-center shadow-xl bg-neutral-900">
        <FauxMenu />

        {title && (
          <span className="absolute left-1/2 transform -translate-x-1/2 text-sm font-mono tracking-wide hidden sm:block text-neutral-400">
            {title}
          </span>
        )}
      </div>
      {/*<div className="relative transition-[height] duration-300 w-full max-h-full border-[3px] border-t-0 rounded-bl-lg rounded-br-lg border-solid overflow-hidden border-neutral-900 bg-neutral-900">*/}
      <div className="text-xs sm:text-base flex flex-col flex-wrap gap-5 tracking-normal bg-neutral-900 transition-colors border-[3px] border-neutral-900 rounded-bl-lg rounded-br-lg shadow-xl mx-auto w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Window;
