"use client";

import { BiSolidQuoteLeft } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { GoFileDirectoryFill } from "react-icons/go";
import { ImHome } from "react-icons/im";
import {
  SidebarItem,
  SidebarItemGroup,
} from "@/app/admin/(modules)/_components/Sidebar/SidebarItem";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaRegImages } from "react-icons/fa6";

const data = [
  {
    items: [
      {
        text: "Dashboard",
        href: "/dashboard",
        icon: ImHome,
      },
      {
        text: "Gallery",
        href: "/gallery",
        icon: FaRegImages,
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        text: "Projects",
        href: "/projects",
        icon: GoFileDirectoryFill,
      },
      {
        text: "Quotes",
        href: "/quotes",
        icon: BiSolidQuoteLeft,
      },
      {
        text: "Daydreams",
        href: "/daydreams",
        icon: BsFillMoonStarsFill,
      },
    ],
  },
];

const poweredBy = [
  { icon: SiReact, text: "ReactJS" },
  { icon: SiNextdotjs, text: "NextJS" },
  { icon: SiReactquery, text: "ReactQuery" },
  { icon: SiTypescript, text: "Typescript" },
  { icon: SiTailwindcss, text: "TailwindCSS" },
  { icon: SiSupabase, text: "Supabase" },
  { icon: SiVercel, text: "Vercel" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed min-h-screen h-full w-64 flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg text-neutral-700 mb-2">
        Admin
      </div>

      <div className="flex flex-col justify-between text-neutral-600 font-sans pl-3 pr-2 py-4 flex-1">
        <div className="mb-6">
          {data.map((group, index) => (
            <Fragment key={`group-${index}`}>
              {group?.title && (
                <div className="text-neutral-400 mb-3 text-sm font-medium px-2 uppercase">
                  {group?.title}
                </div>
              )}

              <SidebarItemGroup>
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.text}
                    text={item.text}
                    href={item.href}
                    isActive={pathname.includes(item.href)}
                    icon={item.icon}
                  />
                ))}
              </SidebarItemGroup>
            </Fragment>
          ))}
        </div>

        <div className="print:hidden">
          <div className="text-sm text-neutral-500 mb-2">Powered by:</div>
          <ul className="flex flex-row gap-2.5">
            {poweredBy.map(({ icon: Icon, text }) => (
              <li
                className="cursor-pointer"
                key={`powered-by-${text}`}
                data-tooltip-id="admin-tooltip"
                data-tooltip-content={text}
              >
                <Icon></Icon>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
