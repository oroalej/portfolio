"use client";

import {FC, useEffect} from "react";
import Link from "next/link";
import {Container, NavLink} from "@/components"
import {useOpenable} from "@/hooks";
import {usePathname} from "next/navigation";
import {PiListLight, PiXThin} from "react-icons/pi";
import DarkModeButton from "@/app/(guest)/_components/DarkModeButton";

const TheHeader: FC = () => {
    const {isOpen, onToggle} = useOpenable();
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
            className="sm:fixed sm:top-0 sm:left-2.5 sm:right-2.5 z-50 dark:bg-slate-800 bg-neutral-100 py-3 sm:py-[22px] border-b border-solid border-slate-200 dark:border-slate-700 dark:border-opacity-60">

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
                        className={`fixed top-0 bottom-0 left-0 right-0 z-[100] mt-[72px] md:flex flex-row items-center justify-between flex-1 md:relative md:mt-0 dark:bg-slate-800 bg-neutral-100 ${isOpen ? 'block' : 'hidden'}`}>
                        <span className="invisible"/>

                        <div className="flex flex-col items-center justify-center md:flex-row gap-4 mt-24 md:mt-0 px-1">
                            <NavLink active={pathname === "/"} href="/">Home</NavLink>
                            <NavLink active={pathname === '/resume'} href="/resume">Résumé</NavLink>
                            <NavLink disabled>Notes</NavLink>
                            <NavLink disabled>Echo</NavLink>
                        </div>

                        <div className="absolute bottom-7 right-7 md:bottom-0 md:right-0 z-50 md:relative pl-8">
                            <DarkModeButton/>
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
