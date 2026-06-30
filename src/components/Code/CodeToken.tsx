import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import { CodeLanguage, CodeTokenType } from "./types";

export const CODE_TOKEN_CLASS_NAMES = {
  javascript: {
    boolean: "text-purple-600",
    comment: "text-neutral-500",
    identifier: "text-gray-400",
    keyword: "text-purple-600",
    operator: "text-white",
    property: "text-rose-500",
    punctuation: "text-yellow-400",
    string: "text-green-400",
    variable: "text-gray-400",
  },
  php: {
    boolean: "text-purple-600",
    comment: "text-neutral-500",
    identifier: "text-gray-400",
    keyword: "text-purple-600",
    operator: "text-white",
    property: "text-green-400",
    punctuation: "text-yellow-400",
    string: "text-green-400",
    variable: "text-sky-300",
  },
} satisfies Record<CodeLanguage, Record<CodeTokenType, string>>;

export const getCodeTokenClassName = (
  type: CodeTokenType,
  language: CodeLanguage = "javascript",
  className?: string
) => classNames(CODE_TOKEN_CLASS_NAMES[language][type], className);

interface CodeTokenProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  language?: CodeLanguage;
  type: CodeTokenType;
}

export const CodeToken = ({
  children,
  className,
  language = "javascript",
  type,
  ...remaining
}: CodeTokenProps) => (
  <span
    {...remaining}
    className={getCodeTokenClassName(type, language, className)}
  >
    {children}
  </span>
);
