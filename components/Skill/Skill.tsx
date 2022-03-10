import React, {FC} from "react"
import {Icon} from "@icons-pack/react-simple-icons";

export interface SkillInterface {
  icon?: Icon | undefined,
  text: string
}

export const Skill: FC<SkillInterface> = (props: SkillInterface) => {
  const {text, icon} = props
  const IconElement: Icon | undefined = icon;

  return (
    <div className="flex flex-row items-center gap-2.5" key={text}>
      {
        IconElement ? (
          <IconElement size={20}/>
        ) : (
          <div className="w-5 h-5 dark:bg-neutral-200 bg-neutral-700 opacity-90 rounded-sm"/>
        )
      }
      <span className="select-all capitalize">{text}</span>
    </div>
  )
};
