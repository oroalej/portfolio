import {FC, Fragment} from "react";

const SingleLineComment: FC = ({children}) => (
  <Fragment>
    <span className="mr-2 text-neutral-500">{`//`}</span>
    <span className="text-neutral-500">{children}</span>
  </Fragment>
)

export default SingleLineComment;
