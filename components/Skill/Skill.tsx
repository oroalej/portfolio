import React, { FC } from "react";
import { Icon } from "@icons-pack/react-simple-icons";

export interface SkillInterface {
  icon?: Icon | undefined;
  text: string | string[];
}

export const Skill: FC<SkillInterface> = (props: SkillInterface) => {
  const { text, icon } = props;
  const IconElement: Icon | undefined = icon;

  return (
    <div className="flex flex-row items-center gap-2.5">
      {IconElement ? (
        <IconElement size={20} />
      ) : (
        <div className="w-5 h-5 dark:bg-neutral-200 bg-neutral-700 opacity-90 rounded-sm shrink-0" />
      )}

      <div className="capitalize">
        {Array.isArray(text) ? (
          text.map((item) => (
            <span
              className="inline-block select-all whitespace-nowrap [&:not(:last-child):after]:content-['/'] after:mx-2"
              key={item}
            >
              {item}
            </span>
          ))
        ) : (
          <span className="select-all">{text}</span>
        )}
      </div>
    </div>
  );
};
