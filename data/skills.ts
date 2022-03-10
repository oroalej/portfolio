import {SkillInterface} from "@/components/index";
import {
  Composer,
  CssThree,
  Figma,
  Firebase,
  Github,
  Gitlab,
  Go,
  Graphql,
  Html5,
  Javascript,
  Jira,
  Laravel, Mariadb,
  Mysql,
  Php,
  Phpstorm,
  Postman,
  Python,
  ReactJs,
  Slack,
  Tailwindcss,
  Typescript,
  Vuedotjs,
  Yarn
} from "@icons-pack/react-simple-icons";

export const FRONTEND_SKILL: Array<SkillInterface> = [
  {icon: Html5, text: 'HTML5'},
  {icon: CssThree, text: 'CSS3 / SASS'},
  {icon: Tailwindcss, text: 'Tailwind CSS'},
  {icon: Javascript, text: 'Javascript'},
  {icon: Javascript, text: 'ECMAScript'},
  {icon: Typescript, text: 'Typescript'},
  {icon: Vuedotjs, text: 'VueJS'},
  // {icon: ReactJs, text: 'ReactJs'},
  {text: 'Inertia'}
];

export const BACKEND_SKILL: Array<SkillInterface> = [
  {icon: Laravel, text: 'Laravel'},
  {icon: Php, text: 'PHP'},
  // {icon: Go, text: 'GoLang'},
  // {icon: Python, text: 'Python'},
  {text: 'PHPUnit'},
  // {text: 'PestPHP'},
]

export const DATABASE_SKILL: Array<SkillInterface> = [
  {icon: Mysql, text: 'Mysql'},
  {icon: Mariadb, text: 'MariaDB'},
  {icon: Graphql, text: 'GraphQL'},
  // {icon: Firebase, text: 'Firebase'},
  // {text: 'NoSQL'}
]

export const TOOLS_SKILL: Array<SkillInterface> = [
  {icon: Phpstorm, text: 'Phpstorm'},
  {icon: Postman, text: 'Postman'},
  {icon: Figma, text: 'Figma'},
  {icon: Github, text: 'Github'},
  {icon: Gitlab, text: 'Gitlab'},
  {icon: Slack, text: 'Slack'},
  {icon: Jira, text: 'Jira'},
  {icon: Yarn, text: 'Yarn'},
  {icon: Composer, text: 'Composer'},
]
