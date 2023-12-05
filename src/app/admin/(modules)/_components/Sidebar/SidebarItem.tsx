import Link from "next/link";
import classNames from "classnames";
import { IconType } from "react-icons";
import { BaseComponent } from "@/types";

export interface SidebarItem {
  href: string;
  text: string;
  icon: IconType;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const SidebarItem = ({
  href,
  text,
  isActive,
  icon: Icon,
}: SidebarItem) => {
  return (
    <Link
      href={`/admin${href}`}
      className={classNames(
        "relative flex items-center gap-3.5 cursor-pointer w-full py-2.5 px-3 rounded-md hover:bg-neutral-800 hover:text-gray-200 transition-colors mb-2 capitalize",
        [isActive ? "bg-neutral-800 text-neutral-200" : "text-neutral-700"]
      )}
    >
      <Icon className="text-base" />
      <span className="text-sm font-bold">{text}</span>
    </Link>
  );
};

export const SidebarItemGroup = ({ children }: BaseComponent) => (
  <div className="flex flex-col mb-3">{children}</div>
);
