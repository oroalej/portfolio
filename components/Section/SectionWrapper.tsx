import {Container} from "@/components/index";
import {FC, ReactNode} from "react";

interface SectionWrapperInterface {
  children?: ReactNode,
  id?: string,
  className?: string
}

const SectionWrapper: FC<SectionWrapperInterface> = (props: SectionWrapperInterface) => {
  const {children, id, className = ''} = props

  return (
    <div
      className={`py-14 md:py-20 lg:py-32 dark:text-neutral-300 ${className}`}
      id={id}
    >
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default SectionWrapper;
