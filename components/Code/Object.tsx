import {FC, Fragment, ReactNode} from "react";

export interface ObjectInterface {
  children: ReactNode;
  name: string,
  isLast?: boolean
}

export const Object: FC<ObjectInterface> = (props: ObjectInterface) => {
  const {children, name, isLast = false} = props;

  return (
    <Fragment>
      <span className="text-rose-500">{name}</span>
      <span className="text-white mr-1.5 sm:mr-2">:</span>
      {children}
      {!isLast && <span className="text-white">,</span>}
    </Fragment>
  )
}
