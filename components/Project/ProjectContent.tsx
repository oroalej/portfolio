import {FC} from "react";

const SectionContent: FC = ({children}) => (
  <div className="flex flex-col gap-8 md:gap-12 lg:px-8 mt-16">
    {children}
  </div>
)

export default SectionContent;
