"use client";

import {Container, NavLink} from "@/components";
import Link from "next/link";
import DarkModeButton from "@/app/(guest)/_components/DarkModeButton";
import {usePathname} from "next/navigation";

const TheHeader = () => {
    const pathname = usePathname()

    return (
        <div
            className="sm:fixed sm:top-0 left-0 right-0 z-50 dark:bg-slate-800 bg-neutral-100 py-3 sm:py-[22px] border-b border-solid border-slate-200 dark:border-slate-700 dark:border-opacity-60">

            <Container>
                <div className="z-50 flex justify-between items-center flex-row w-full">
                    <Link href="/" className="sm:flex flex-row gap-1 items-end">
                        <span
                            className="text-lg md:text-xl font-bold leading-none text-neutral-700 dark:text-neutral-200">
                            Admin Panel
                        </span>
                    </Link>

                    <div
                        className={`fixed top-0 bottom-0 left-0 right-0 z-[100] mt-[72px] md:flex flex-row items-center justify-between flex-1 md:relative md:mt-0 dark:bg-slate-800 bg-neutral-100`}>
                        <span className="invisible"/>

                        <div className="flex flex-col items-center justify-center md:flex-row gap-4 mt-24 md:mt-0 px-1">
                            <NavLink active={pathname === "/admin"} href="/admin">Dashboard</NavLink>
                            <NavLink active={pathname === "/admin/projects"} href="/admin/projects">Projects</NavLink>
                            <NavLink active={pathname === '/admin/notes'} href="/admin/notes">Notes</NavLink>
                            <NavLink active={pathname === '/admin/daydreams'} href="/admin/daydreams">Daydreams</NavLink>
                        </div>

                        <div className="absolute bottom-7 right-7 md:bottom-0 md:right-0 z-50 md:relative pl-8">
                            <DarkModeButton/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TheHeader
