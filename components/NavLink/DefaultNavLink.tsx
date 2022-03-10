import {FC, ReactNode} from "react";
import styles from "./nav-link.module.css"
import classNames from "classnames";
import Link from "next/link"

interface ActiveNavLinkInterface {
  children: ReactNode,
  href: string,
}

const DefaultNavLink: FC<ActiveNavLinkInterface> = (props: ActiveNavLinkInterface) => {
  const {children, href} = props;

  return (
    <Link passHref href={href}>
      <a
        className={classNames(styles.default, styles.border, 'dark:text-neutral-100 dark:hover:border-neutral-200')}>
        {children}
      </a>
    </Link>
  )
}

export default DefaultNavLink;
