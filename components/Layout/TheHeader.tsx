import {FC, useEffect} from "react";
import {List, X} from "phosphor-react";
import Link from "next/link";
import {Container, DarkModeButton, NavLink} from "@/components/index"
import {useOpenable} from "@/hooks/index";
import {useRouter} from "next/router";

const TheHeader: FC = () => {
  const {isOpen, onClose, onToggle} = useOpenable();
  const router = useRouter();

  // Add overflow hidden to HTML when navbar is open.
  useEffect(() => {
    const HTML = document.getElementsByTagName('html').item(0);

    if (HTML) {
      HTML.style.overflow = isOpen ? 'hidden' : '';
    }
  }, [isOpen])

  // When route changes, close the navbar.
  useEffect(() => {
    router.events.on("routeChangeComplete", onClose);

    return () => {
      router.events.off("routeChangeComplete", onClose);
    };
  }, [router])

  return (
    <div className="sm:fixed sm:top-0 sm:left-2.5 sm:right-2.5 z-50 dark:bg-slate-800 bg-neutral-100 py-3 sm:py-[22px] border-b border-solid border-slate-200 dark:border-slate-700 dark:border-opacity-60">
      <Container>
        <div className="z-50 flex justify-between items-center flex-row w-full">
          <Link passHref href="/">
            <a className="sm:flex flex-row gap-1 items-end">
              <span className="text-lg md:text-2xl font-bold leading-none text-neutral-700 dark:text-neutral-200">
                Alex
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500 mb-0.5"/>
            </a>
          </Link>

          <div
            className={`fixed top-0 bottom-0 left-0 right-0 z-[100] mt-[72px] md:flex flex-row items-center justify-between flex-1 md:relative md:mt-0 dark:bg-slate-800 bg-neutral-100 ${isOpen ? 'block' : 'hidden'}`}>
            <span className="invisible"/>

            <div className="flex flex-col items-center justify-center md:flex-row gap-4 mt-24 md:mt-0 px-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/resume">Résumé</NavLink>
              <NavLink disabled>Notes</NavLink>
              <NavLink disabled>Echo</NavLink>
            </div>

            <div className="absolute bottom-7 right-7 md:bottom-0 md:right-0 z-50 md:relative pl-8">
              <DarkModeButton />
            </div>
          </div>



          <div className="p-2 cursor-pointer -mr-2 block md:hidden" onClick={onToggle}>
            {
              isOpen ?
                <X size={32} weight="regular" className="dark:text-neutral-300 text-neutral-700"/> :
                <List size={32} weight="regular" className="dark:text-neutral-300 text-neutral-700"/>
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TheHeader
