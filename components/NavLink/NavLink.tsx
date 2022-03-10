import {FC, ReactNode} from "react";
import {useRouter} from "next/router";
import {ActiveNavLink, DefaultNavLink, DisabledNavLink} from "@/components/index";

interface BaseNavLinkInterface {
  children: ReactNode
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

const NavLink: FC<NavLink> = (props: NavLink) => {
  const {children, href = null, disabled = false} = props;
  const {asPath} = useRouter();

  if (disabled || href === null)
    return <DisabledNavLink>{children}</DisabledNavLink>

  if (asPath === href)
    return <ActiveNavLink href={href}>{children}</ActiveNavLink>

  return <DefaultNavLink href={href}>{children}</DefaultNavLink>
}

export default NavLink;
