import {FauxMenu} from "@/components/Code/index";
import {FC, ReactNode} from "react";
import styles from "@/components/Code/Window.module.css"

interface WindowInterface {
  children: ReactNode,
  title?: string | undefined,
  theme?: string | undefined
}

const Window: FC<WindowInterface> = (props) => {
  const {children, title} = props

  return (
    <div className={styles.wrapper}>
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
