import { Children, Fragment, ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { CodeToken } from "./CodeToken";
import { CodeLanguage } from "./types";

export interface MultiLineCommentProps {
  children: ReactNode;
  language?: CodeLanguage;
  startCount?: number;
  startLine?: number;
  withTrailingBlankLine?: boolean;
}

const MultiLineComment = ({
  children,
  language = "javascript",
  startCount,
  startLine,
  withTrailingBlankLine = false,
}: MultiLineCommentProps) => {
  const comments = Children.toArray(children);
  const firstLine = startLine ?? startCount ?? 1;

  return (
    <Fragment>
      <CodeBlock line={firstLine}>
        <CodeToken type="comment" language={language}>{`/**`}</CodeToken>
      </CodeBlock>

      {comments.map((comment, index) => (
        <CodeBlock
          line={firstLine + 1 + index}
          key={`multi-${index}`}
          contentClassName="flex-nowrap"
        >
          <CodeToken
            type="comment"
            language={language}
            className="ml-[0.60rem] mr-2"
          >
            *
          </CodeToken>
          <CodeToken type="comment" language={language}>
            {comment}
          </CodeToken>
        </CodeBlock>
      ))}

      <CodeBlock line={firstLine + comments.length + 1}>
        <CodeToken
          type="comment"
          language={language}
          className="ml-[0.60rem]"
        >{`*/`}</CodeToken>
      </CodeBlock>

      {withTrailingBlankLine && (
        <CodeBlock line={firstLine + comments.length + 2} />
      )}
    </Fragment>
  );
};

export default MultiLineComment;
