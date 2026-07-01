"use client";

import Container from "@/app/(web)/_components/Container";
import { Section } from "@/components";
import { Skill } from "@/app/(web)/(index)/_components/Skill";
import { SKILL_GROUPS } from "@/data/resume";
import { IconType } from "react-icons";
import {
  SiAngular,
  SiClaude,
  SiConfluence,
  SiCss,
  SiFigma,
  SiGit,
  SiGitlab,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPinia,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiReactquery,
  SiRedis,
  SiSass,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

const SKILL_ICON_MAP: Partial<Record<string, IconType>> = {
  AngularJS: SiAngular,
  "Claude Code": SiClaude,
  Confluence: SiConfluence,
  CSS3: SiCss,
  Figma: SiFigma,
  Git: SiGit,
  GitLab: SiGitlab,
  Go: SiGo,
  GraphQL: SiGraphql,
  HTML5: SiHtml5,
  JavaScript: SiJavascript,
  Jira: SiJira,
  Laravel: SiLaravel,
  MySQL: SiMysql,
  "Next.js": SiNextdotjs,
  PHP: SiPhp,
  Pinia: SiPinia,
  PostgreSQL: SiPostgresql,
  Postman: SiPostman,
  React: SiReact,
  Redis: SiRedis,
  "SCSS / CSS3": SiSass,
  ShadCN: SiShadcnui,
  Supabase: SiSupabase,
  TailwindCSS: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  "TanStack Query": SiReactquery,
  Trello: SiTrello,
  TypeScript: SiTypescript,
  Vite: SiVite,
  Vue: SiVuedotjs,
  SASS: SiSass,
};

const SkillsSection = () => {
  return (
    <Container id="what-i-use" className="py-32 dark:text-white">
      <Section.Title anchor="#what-i-use">Tech Stack</Section.Title>

      <Section.Content>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 md:gap-20 xl:gap-10">
          {SKILL_GROUPS.map(({ title, items }) => (
            <div className="block" key={title}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 select-all">
                {title}
              </h3>

              <div className="flex flex-col gap-5 text-sm sm:text-base lg:text-lg">
                {items.map((item) => (
                  <Skill
                    icon={SKILL_ICON_MAP[item]}
                    text={item}
                    key={`${title}-${item}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section.Content>
    </Container>
  );
};

export default SkillsSection;
