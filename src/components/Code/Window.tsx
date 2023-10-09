import {FauxMenu} from "./index";
import {HTMLAttributes} from "react";
import styles from "./Window.module.css"
import classNames from "classnames";

interface WindowInterface extends HTMLAttributes<HTMLDivElement> {
    title?: string | undefined,
    theme?: string | undefined
}

const Window = ({children, title, className, ...remaining}: WindowInterface) => {
    return (
        <div className={classNames(styles.wrapper, className)} {...remaining}>
            <div className={styles.header}>
                <FauxMenu/>

                {title && (
                    <span className={styles.title}>
                        {title}
                    </span>
                )}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default Window;
