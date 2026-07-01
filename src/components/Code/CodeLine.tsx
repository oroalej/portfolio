import classNames from "classnames";
import { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { CodeIndentLevel } from "./types";

export const CODE_LINE_INDENT_CLASS_NAMES = {
  0: "",
  1: "ml-2 sm:ml-4",
  2: "ml-4 sm:ml-8",
  3: "ml-6 sm:ml-12",
} satisfies Record<CodeIndentLevel, string>;

export const getCodeLineIndentClassName = (indent: CodeIndentLevel = 0) =>
  CODE_LINE_INDENT_CLASS_NAMES[indent];

export interface CodeLineProps {
  children?: ReactNode;
  contentClassName?: string;
  indent?: CodeIndentLevel;
  line: number;
}

export const CodeLine = ({
  children,
  contentClassName,
  indent = 0,
  line,
}: CodeLineProps) => (
  <CodeBlock
    line={line}
    contentClassName={classNames(
      getCodeLineIndentClassName(indent),
      contentClassName
    )}
  >
    {children}
  </CodeBlock>
);
