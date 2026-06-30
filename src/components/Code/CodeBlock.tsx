import classNames from "classnames";
import { ReactNode } from "react";

export interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  line: number;
}

export const CodeBlock = ({
  children,
  className,
  contentClassName,
  line,
}: CodeBlockProps) => {
  const resolvedContentClassName = classNames(
    "flex-1 flex flex-row flex-wrap",
    className,
    contentClassName
  );

  return (
    <div className="flex flex-row flex-nowrap">
      <span
        aria-hidden="true"
        className="w-4 whitespace-nowrap text-neutral-500 font-light mr-2 md:mr-6 text-right opacity-90"
      >
        {line}
      </span>

      <div className={resolvedContentClassName}>{children}</div>
    </div>
  );
};
