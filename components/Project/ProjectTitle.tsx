import React, {FC, ReactNode} from "react";

export interface ProjectTitleInterface {
  children: ReactNode
}

export const ProjectTitle: FC<ProjectTitleInterface> = ({children}: ProjectTitleInterface) => (
  <h3 className="text-lg sm:text-xl block mb-2">{children}</h3>
)
