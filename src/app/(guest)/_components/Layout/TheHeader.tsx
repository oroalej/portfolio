"use client";

import {FC, useEffect} from "react";
import Link from "next/link";
import {Container, ExternalLink, NavLink} from "@/components"
import {useOpenable} from "@/hooks";
import {usePathname} from "next/navigation";
import {PiListLight, PiXThin} from "react-icons/pi";
import DarkModeButton from "@/app/(guest)/_components/DarkModeButton";
import {SiGithub} from "react-icons/si";

const TheHeader: FC = () => {
    const {isOpen, onToggle, onClose} = useOpenable();
    const pathname = usePathname();

    // Add overflow hidden to HTML when navbar is open.
    useEffect(() => {
        const HTML = document.getElementsByTagName('html').item(0);

        if (HTML) {
            HTML.style.overflow = isOpen ? 'hidden' : '';
        }
    }, [isOpen])

    return (
        <div
            className="sm:fixed sm:top-0 sm:left-2.5 sm:right-2.5 z-50 dark:bg-neutral-900 bg-neutral-100 py-3 sm:py-[22px] border-b border-solid border-slate-200 dark:border-neutral-900 dark:border-opacity-60">

            <Container>
                <div className="z-50 flex justify-between items-center flex-row w-full">
                    <Link href="/" className="sm:flex flex-row gap-1 items-end">
                        <span
                            className="text-lg md:text-2xl font-bold leading-none text-neutral-700 dark:text-neutral-200">
                            Alex
                        </span>
                        <span className="w-2 h-2 rounded-full bg-rose-500 mb-0.5"/>
                    </Link>

                    <div
                        className={`fixed top-0 bottom-0 left-0 right-0 z-[100] mt-[72px] md:flex flex-row items-center justify-between flex-1 md:relative md:mt-0 dark:bg-neutral-900 bg-neutral-100 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
                        <span className="invisible"/>

                        <div className="flex flex-col items-center justify-center md:flex-row gap-4 mt-24 md:mt-0 px-1">
                            <NavLink onClick={onClose} active={pathname === "/"} href="/">Home</NavLink>
                            <NavLink onClick={onClose} active={pathname === '/resume'} href="/resume">Résumé</NavLink>
                            <NavLink onClick={onClose} active={pathname.startsWith("/quotes")} href="/quotes">Quotes</NavLink>
                            <NavLink onClick={onClose} active={pathname === '/daydreams'} href="/daydreams">Daydreams</NavLink>
                        </div>

                        <div className="flex flex-row gap-6 sm:gap-3 items-center justify-center sm:justify-start mt-12 sm:mt-0">
                            <ExternalLink
                                href="https://github.com/oroalej/portfolio"
                                className="text-neutral-700 bg-white sm:bg-transparent hover:bg-neutral-200 p-3 dark:bg-transparent dark:hover:bg-neutral-700 dark:text-white rounded-full transition-colors"
                                data-tooltip-id="guest-tooltip"
                                data-tooltip-content="Github Repository"
                            >
                                <SiGithub className="text-xl" />
                            </ExternalLink>

                            <div className="z-50 md:relative">
                                <DarkModeButton/>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 cursor-pointer -mr-2 block md:hidden" onClick={onToggle}>
                        {
                            isOpen ?
                                <PiXThin size={32} className="dark:text-neutral-300 text-neutral-700"/> :
                                <PiListLight size={32} className="dark:text-neutral-300 text-neutral-700"/>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TheHeader
