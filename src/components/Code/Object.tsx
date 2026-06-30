import { Fragment, ReactNode } from "react";
import classNames from "classnames";
import { CodeToken } from "./CodeToken";
import { CodeLanguage } from "./types";

export interface CodePropertyProps {
  children: ReactNode;
  name: string;
  isLast?: boolean;
  language?: CodeLanguage;
  operator?: string;
  operatorClassName?: string;
  withTrailingComma?: boolean;
}

const CodeProperty = ({
  children,
  isLast,
  language = "javascript",
  name,
  operator = ":",
  operatorClassName = "mr-1.5 sm:mr-2",
  withTrailingComma,
}: CodePropertyProps) => {
  const shouldRenderTrailingComma = withTrailingComma ?? !isLast;

  return (
    <Fragment>
      <CodeToken type="property" language={language}>
        {name}
      </CodeToken>
      <CodeToken
        type="operator"
        language={language}
        className={classNames(operatorClassName)}
      >
        {operator}
      </CodeToken>
      {children}
      {shouldRenderTrailingComma && (
        <CodeToken type="operator" language={language}>
          ,
        </CodeToken>
      )}
    </Fragment>
  );
};

export { CodeProperty, CodeProperty as Object };
