import {CaretUp} from "phosphor-react";
import {FC, useEffect, useState} from "react";

const ScrollTopBottom: FC = () => {
  const [isTop, setIsTop] = useState(true)

  const onScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const handleScrollListener = () => setIsTop(window.scrollY <= window.outerHeight)

    window.addEventListener('scroll', handleScrollListener)

    return () => window.removeEventListener('scroll', handleScrollListener)
  }, [isTop])

  return (
    <button onClick={onScroll}
            className={`group bg-neutral-900 p-1 inline-flex fixed bottom-3 sm:bottom-6 lg:bottom-10 right-3 sm:right-6 lg:right-10 opacity-0 transition-opacity ${isTop ? "pointer-event-none" : "opacity-100"}`}>
      <span
        className="text-neutral-100 cursor-pointer group-hover:mt-0.5 group-hover:-mb-0.5 transition-all duration-300 block">
        <CaretUp weight="light" className="text-4xl lg:text-[2.875rem]"/>
      </span>
    </button>
  )
}

export default ScrollTopBottom;
