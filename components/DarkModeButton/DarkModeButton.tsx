import {FC, useEffect, useState} from "react";
import {Moon, Sun} from "phosphor-react";
import {Switch} from "@headlessui/react";

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

const DarkModeButton: FC = () => {
  const [enabled, setEnabled] = useState(false)

  const setPageTheme = (event: boolean) => {
    const documentRoot = window.document.documentElement;

    if (event) {
      documentRoot.classList.add('dark')
    } else {
      documentRoot.classList.remove('dark')
    }

    localStorage.theme = event ? 'dark' : 'light';
  }

  // Trigger once
  useEffect(() => setEnabled(isInitialDarkTheme() === 'dark'), [])

  // Trigger everytime 'enabled' updated
  useEffect(() => setPageTheme(enabled), [enabled])

  return (
    <Switch
      id="switch"
      checked={enabled}
      onChange={setEnabled}
      className={`border border-solid border-neutral-200 dark:border-slate-800 rounded-full h-10 w-10 flex items-center justify-center ${enabled ? "bg-neutral-900" : "bg-white"}`}
    >
      {
        enabled ? <Moon weight="fill" size={20} className="text-yellow-300"/> :
          <Sun weight="fill" size={20} className="text-yellow-400"/>
      }
    </Switch>
  )
}

export default DarkModeButton;
