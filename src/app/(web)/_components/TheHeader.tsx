"use client";

import Link from "next/link";
import Container from "@/app/(web)/_components/Container";
import { Switch } from "@headlessui/react";
import { ExternalLink } from "@/components";
import { SiGithub } from "react-icons/si";
import { PiListLight, PiMoonFill, PiXThin } from "react-icons/pi";
import { NavLink } from "@/app/(web)/_components/NavLink/NavLink";
import { useOpenable } from "@/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import classNames from "classnames";
import DarkModeButton from "@/app/(web)/_components/DarkModeButton";

const TheHeader = () => {
  const { isOpen, onToggle, onClose } = useOpenable();
  const pathname = usePathname();

  // Add overflow hidden to HTML when navbar is open.
  useEffect(() => {
    const HTML = document.getElementsByTagName("html").item(0);

    if (HTML) {
      HTML.style.overflow = isOpen ? "hidden" : "";
    }
  }, [isOpen]);

  return (
    <Container className="py-2 lg:py-9 flex flex-row sm:gap-24 items-center justify-between font-mono w-full">
      <Link href={"/"} className="sm:flex flex-row gap-1 items-end">
        <span className="text-lg lg:text-2xl font-bold leading-none text-neutral-700 dark:text-neutral-200">
          Alex
        </span>
        <span className="w-2 h-2 rounded-full bg-rose-500 mb-0.5" />
      </Link>

      <div
        className={classNames(
          "fixed inset-0 lg:relative w-full bg-white z-10 lg:bg-transparent",
          [isOpen ? "block" : "hidden lg:block"]
        )}
      >
        <div className="relative flex flex-col items-center lg:flex-row py-24 lg:py-0">
          {isOpen && (
            <button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:hidden"
              onClick={onClose}
            >
              <PiXThin
                size={32}
                className="dark:text-neutral-300 text-neutral-700"
              />
            </button>
          )}

          <div className="flex flex-col gap-4 lg:flex-row xs:gap-6 lg:gap-8 items-center xs:text-sm lg:text-base">
            <NavLink href={"/"} active={pathname === "/"} onClick={onClose}>
              Home
            </NavLink>

            <NavLink
              href={"/resume"}
              active={pathname === "/resume"}
              onClick={onClose}
            >
              Résumé
            </NavLink>

            <NavLink
              href={`/projects`}
              active={pathname.startsWith("/projects")}
              onClick={onClose}
            >
              Projects
            </NavLink>

            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />

            <NavLink
              href={`/quotes`}
              active={pathname.startsWith("/quotes")}
              onClick={onClose}
            >
              Quotes
            </NavLink>

            <NavLink
              href={"/daydreams"}
              active={pathname === "/daydreams"}
              onClick={onClose}
            >
              Daydreams
            </NavLink>

            {/*<NavLink disabled>Notes</NavLink>*/}
          </div>

          <div className="mt-12 flex flex-row gap-5 items-center lg:ml-auto lg:mt-0">
            <ExternalLink
              href="https://github.com/oroalej/portfolio"
              className="text-neutral-700 bg-white hover:bg-neutral-200 p-3 rounded-full transition-colors"
              data-tooltip-id="guest-tooltip"
              data-tooltip-content="Github Repository"
            >
              <SiGithub className="text-xl" />
            </ExternalLink>

            <DarkModeButton />
          </div>
        </div>
      </div>

      <div
        className="p-2 cursor-pointer -mr-2 block lg:hidden"
        onClick={onToggle}
      >
        <PiListLight
          size={32}
          className="dark:text-neutral-300 text-neutral-700"
        />
      </div>
    </Container>
  );
};

export default TheHeader;
