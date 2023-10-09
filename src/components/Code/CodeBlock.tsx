"use client";

import {FC, ReactNode} from "react";

export interface CodeBlockInterface {
  children?: ReactNode;
  className?: string;
  line: number;
}

export const CodeBlock: FC<CodeBlockInterface> = (props: CodeBlockInterface) => {
  const {children, className, line} = props;

  return (
    <div className="flex flex-row flex-nowrap">
      <span className="w-4 whitespace-nowrap text-neutral-500 font-light mr-2 md:mr-6 text-right opacity-90">
        {line}
      </span>

      <div className={`flex-1 flex flex-row flex-wrap ${className ? className : ""}`}>
        {children}
      </div>
    </div>
  )
}
