"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { PiMoonFill, PiSunFill } from "react-icons/pi";

const isInitialDarkTheme = () => {
  if ("theme" in localStorage) {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme !== null) {
      return storedTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  return "light";
};

const DarkModeButton = () => {
  const [enabled, setEnabled] = useState(false);

  const setPageTheme = (event: boolean) => {
    const documentRoot = window.document.documentElement;

    if (event) documentRoot.classList.add("dark");
    else documentRoot.classList.remove("dark");

    localStorage.theme = event ? "dark" : "light";
  };

  useEffect(() => setEnabled(isInitialDarkTheme() === "dark"), []);
  useEffect(() => setPageTheme(enabled), [enabled]);

  return (
    <Switch
      id="switch"
      className="rounded-full h-10 w-10 flex items-center justify-center bg-white hover:bg-neutral-200 group transition-colors z-50 lg:relative"
      checked={enabled}
      onChange={setEnabled}
    >
      {enabled ? (
        <PiMoonFill
          size={20}
          className="text-yellow-400 group-hover:text-neutral-800 transition-colors"
        />
      ) : (
        <PiSunFill
          size={20}
          className="text-yellow-400 group-hover:text-neutral-800 transition-colors"
        />
      )}
    </Switch>
  );
};

export default DarkModeButton;
