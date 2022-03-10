import {HashStraight} from "phosphor-react";
import {FC, ReactNode} from "react";

interface SectionTitleInterface {
  children: ReactNode,
  anchor: string,
  className?: string
}


const SectionTitle: FC<SectionTitleInterface> = (props: SectionTitleInterface) => {
  const {children, anchor, className = ''} = props;

  return (
    <div className={`sm:mb-2 flex flex-row gap-1 items-center mb-2 ${className}`}>
      <HashStraight weight="bold" className="text-rose-500"/>

      <a href={anchor} className="cursor-pointer">
        {children}
      </a>
    </div>
  )
}

export default SectionTitle;
