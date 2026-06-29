import { Fragment, ReactNode } from "react";

const SingleLineComment = ({ children }: { children?: ReactNode }) => (
  <Fragment>
    <span className="mr-2 text-neutral-500">{`//`}</span>
    <span className="text-neutral-500">{children}</span>
  </Fragment>
);

export default SingleLineComment;
