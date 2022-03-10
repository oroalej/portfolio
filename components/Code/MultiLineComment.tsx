import {FC, Fragment, ReactNode} from "react"
import {CodeBlock} from "@/components/index";

export interface MultiLineCommentInterface {
  children: Array<ReactNode>,
  startCount?: number
}

const MultiLineComment: FC<MultiLineCommentInterface> = (props: MultiLineCommentInterface) => {
  const {children, startCount = 1} = props;

  return (
    <Fragment>
      <CodeBlock line={startCount}>
        <span className="text-neutral-500">{`/**`}</span>
      </CodeBlock>

      {
        children.map((comment, index) => (
          <CodeBlock line={startCount + 1 + index} key={`multi-${index}`} className="flex-nowrap">
            <span className="text-neutral-500 ml-[0.60rem] mr-2">*</span>
            <span className="text-neutral-500">{comment}</span>
          </CodeBlock>
        ))
      }

      <CodeBlock line={startCount + children.length + 1}>
        <span className="text-neutral-500 ml-[0.60rem]">{`*/`}</span>
      </CodeBlock>

      <CodeBlock line={startCount + children.length + 2}/>
    </Fragment>
  )
}

export default MultiLineComment
