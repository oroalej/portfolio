import {
  ProjectContent,
  SectionTitle,
  SectionWrapper,
  Skill,
  SkillInterface,
} from "@/components/index";
import { BACKEND_SKILL, DATABASE_SKILL, FRONTEND_SKILL } from "@/data/skills";

export interface SkillListInterface {
  title: string;
  data: Array<SkillInterface>;
}

const Skills = () => {
  const list: Array<SkillListInterface> = [
    { title: "Frontend", data: FRONTEND_SKILL },
    { title: "Backend", data: BACKEND_SKILL },
    { title: "Database", data: DATABASE_SKILL },
  ];

  return (
    <SectionWrapper className="text-neutral-600" id="what-i-use">
      <SectionTitle
        className="text-xl sm:text-2xl md:text-3xl"
        anchor="#what-i-use"
      >
        Tech Stack
      </SectionTitle>

      <ProjectContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
          {list.map(({ title, data }) => (
            <div className="block" key={title}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold capitalize mb-3 select-all">
                {title}
              </h3>

              <div className="flex flex-col gap-5 text-sm sm:text-base lg:text-lg">
                {data.map(({ icon, text }) => (
                  <Skill
                    icon={icon}
                    text={text}
                    key={Array.isArray(text) ? text[0] : text}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ProjectContent>
    </SectionWrapper>
  );
};

export default Skills;
