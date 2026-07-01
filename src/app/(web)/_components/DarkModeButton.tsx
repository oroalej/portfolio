"use client";

import { useEffect, useSyncExternalStore } from "react";
import { PiMoonFill, PiSunFill } from "react-icons/pi";
import * as Switch from "@radix-ui/react-switch";

const themeChangeEvent = "portfolio-theme-change";

const getDarkThemeSnapshot = () => {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem("theme") === "dark";
};

const subscribeToThemeChanges = (onStoreChange: () => void) => {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
};

const setPageTheme = (isDark: boolean) => {
  const documentRoot = window.document.documentElement;

  if (isDark) documentRoot.classList.add("dark");
  else documentRoot.classList.remove("dark");
};

const DarkModeButton = () => {
  const enabled = useSyncExternalStore(
    subscribeToThemeChanges,
    getDarkThemeSnapshot,
    () => false
  );

  useEffect(() => {
    setPageTheme(enabled);
  }, [enabled]);

  const onCheckedChange = (isDark: boolean) => {
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
    setPageTheme(isDark);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <Switch.Root
      className="rounded-full h-10 w-10 flex items-center justify-center bg-white hover:bg-neutral-200 group transition-colors z-50 lg:relative"
      checked={enabled}
      aria-label="Toggle dark mode"
      onCheckedChange={onCheckedChange}
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
    </Switch.Root>
  );
};

export default DarkModeButton;
