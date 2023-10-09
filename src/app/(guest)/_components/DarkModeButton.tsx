"use client";

import {useEffect, useState} from "react";
import {Switch} from "@headlessui/react";
import {PiMoonFill, PiSunFill} from "react-icons/pi";

const isInitialDarkTheme = () => {
    if ('theme' in localStorage) {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme !== null) {
            return storedTheme;
        }

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
    }

    return 'light';
}

const DarkModeButton = () => {
    const [enabled, setEnabled] = useState(false)

    const setPageTheme = (event: boolean) => {
        const documentRoot = window.document.documentElement;

        if (event)
            documentRoot.classList.add('dark')
        else
            documentRoot.classList.remove('dark')


        localStorage.theme = event ? 'dark' : 'light';
    }

    useEffect(() => setEnabled(isInitialDarkTheme() === 'dark'), [])

    useEffect(() => setPageTheme(enabled), [enabled])

    return (
        <Switch
            id="switch"
            checked={enabled}
            onChange={setEnabled}
            className={`rounded-full h-10 w-10 flex items-center justify-center ${enabled ? "bg-neutral-900" : "bg-white"}`}
        >
            {
                enabled ? <PiMoonFill size={20} className="text-yellow-300"/> :
                    <PiSunFill size={20} className="text-yellow-400"/>
            }
        </Switch>
    )
}

export default DarkModeButton;
