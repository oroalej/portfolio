"use client";

import { ReactNode } from "react";
import classNames from "classnames";
import styles from "@/app/(web)/_components/NavLink/nav-link.module.css";
import Link from "next/link";

export interface BaseNavLinkInterface {
  children: ReactNode;
  active?: boolean;
}

export interface DisabledNavLinkInterface extends BaseNavLinkInterface {
  href?: never;
  disabled: true;
  onClick?: never;
}

export interface ActiveNavLinkInterface extends BaseNavLinkInterface {
  href: string;
  disabled?: never | false;
  onClick?: () => void;
}

type NavLink = DisabledNavLinkInterface | ActiveNavLinkInterface;

export const NavLink = ({
  children,
  href,
  disabled,
  active,
  onClick,
}: NavLink) => {
  if (!!disabled || !href) {
    return (
      <div
        className={classNames(
          styles.default,
          styles.disabled,
          "dark:text-neutral-400"
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={classNames(
        styles.default,
        styles.border,
        "hover:text-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-200",
        {
          [styles.active]: active,
        }
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
