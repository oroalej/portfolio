import {FC} from "react";

const Container: FC = ({children}) => (
  <div className="sm:max-w-screen-md lg:max-w-screen-lg mx-auto px-4">
    {children}
  </div>
)

export default Container;
