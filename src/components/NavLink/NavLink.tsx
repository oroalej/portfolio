"use client";

import {ReactNode} from "react";
import classNames from "classnames";
import styles from "@/components/NavLink/nav-link.module.css";
import Link from "next/link";

interface BaseNavLinkInterface {
    children: ReactNode;
    active?: boolean
}

interface DisabledNavLinkInterface extends BaseNavLinkInterface {
    href?: never;
    disabled: true;
}

interface ActiveNavLinkInterface extends BaseNavLinkInterface {
    href: string;
    disabled?: never | false;
}

type NavLink = DisabledNavLinkInterface | ActiveNavLinkInterface

export const NavLink = ({children, href, disabled, active}: NavLink) => {
    if (!!disabled || !href) {
        return (
            <div className={classNames(styles.default, styles.disabled, 'dark:text-neutral-400')}>
                {children}
            </div>
        )
    }

    return (
        <Link href={href}
              className={classNames(styles.default, styles.border, 'dark:text-neutral-100 dark:hover:border-neutral-200', {
                  [styles.active]: active,
                  "": active
              })}>
            {children}
        </Link>
    )
}