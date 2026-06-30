import { Fragment, ReactNode } from "react";
import classNames from "classnames";
import { CodeToken } from "./CodeToken";
import { CodeLanguage } from "./types";

interface SingleLineCommentProps {
  children?: ReactNode;
  className?: string;
  language?: CodeLanguage;
}

const SingleLineComment = ({
  children,
  className,
  language = "javascript",
}: SingleLineCommentProps) => (
  <Fragment>
    <CodeToken type="comment" language={language} className="mr-2">
      {`//`}
    </CodeToken>
    <CodeToken
      type="comment"
      language={language}
      className={classNames(className)}
    >
      {children}
    </CodeToken>
  </Fragment>
);

export default SingleLineComment;
