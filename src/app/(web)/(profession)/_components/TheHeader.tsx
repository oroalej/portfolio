"use client";

import Link from "next/link";
import { Switch } from "@headlessui/react";
import { ExternalLink } from "@/components";
import { SiGithub } from "react-icons/si";
import { PiMoonFill } from "react-icons/pi";
import { NavLink } from "@/app/(web)/_components/NavLink/NavLink";
import { useOpenable } from "@/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Container from "@/app/(web)/_components/Container";
import { useGetTermByIdentifier } from "@/features/terms/api/getTermByIdentifier";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";

const TheHeader = () => {
  const { isOpen } = useOpenable();
  const pathname = usePathname();

  const { data: termData } = useGetTermByIdentifier(
    TERM_IDENTIFIER.PROJECT_TYPES
  );

  const { data } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });

  const workTaxonomy = data?.find((item) => item.name === "Work");

  // Add overflow hidden to HTML when navbar is open.
  useEffect(() => {
    const HTML = document.getElementsByTagName("html").item(0);

    if (HTML) {
      HTML.style.overflow = isOpen ? "hidden" : "";
    }
  }, [isOpen]);

  return (
    <Container className="py-9 flex flex-row gap-32 items-center font-mono w-full">
      <Link href={"/"} className="sm:flex flex-row gap-1 items-end">
        <span className="text-lg md:text-2xl font-bold leading-none text-neutral-700 dark:text-neutral-200">
          Alex
        </span>
        <span className="w-2 h-2 rounded-full bg-rose-500 mb-0.5" />
      </Link>

      <div className="flex flex-row gap-8">
        <NavLink href={"/"} active={pathname === "/"}>
          Home
        </NavLink>

        <NavLink href={"/resume"} active={pathname === "/resume"}>
          Résumé
        </NavLink>

        {!!workTaxonomy?.id && (
          <NavLink
            href={`/projects/${workTaxonomy!.id}`}
            active={pathname.startsWith("/projects")}
          >
            Projects
          </NavLink>
        )}

        <NavLink disabled>Notes</NavLink>
      </div>

      <div className="ml-auto flex flex-row gap-5 items-center">
        <div className="text-neutral-800 bg-white hover:bg-neutral-200 px-4 py-2 rounded-md transition-colors cursor-pointer">
          Personal
        </div>

        <ExternalLink
          href="https://github.com/oroalej/portfolio"
          className="text-neutral-700 bg-white hover:bg-neutral-200 p-3 rounded-full transition-colors"
          data-tooltip-id="guest-tooltip"
          data-tooltip-content="Github Repository"
        >
          <SiGithub className="text-xl" />
        </ExternalLink>

        <Switch
          id="switch"
          className="rounded-full h-10 w-10 flex items-center justify-center bg-white hover:bg-neutral-200 group transition-colors z-50 md:relative"
        >
          <PiMoonFill
            size={20}
            className="text-yellow-400 group-hover:text-neutral-800 transition-colors"
          />
        </Switch>
      </div>
    </Container>
  );
};

export default TheHeader;
