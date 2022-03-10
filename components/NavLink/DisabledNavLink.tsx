import {FC} from "react";
import styles from "./nav-link.module.css";
import classNames from "classnames";

const DisabledNavLink: FC = (props) => {
  const {children} = props;

  return (
    <div className={classNames(styles.default, styles.disabled, 'dark:text-neutral-100')}>
      {children}
    </div>
  )
}

export default DisabledNavLink
