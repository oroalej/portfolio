import { ReactNode } from "react";

const Container = ({ children }: { children?: ReactNode }) => (
  <div className="sm:max-w-screen-md lg:max-w-screen-lg mx-auto px-4">
    {children}
  </div>
);

export default Container;
