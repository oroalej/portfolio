import {SkillInterface} from "@/components";
import {
    SiCss3,
    SiHtml5,
    SiJavascript,
    SiLaravel,
    SiMysql,
    SiNuxtdotjs,
    SiPhp,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiVuedotjs,
} from "react-icons/si";

export const FRONTEND_SKILL: Array<SkillInterface> = [
    {icon: SiHtml5, text: "HTML5"},
    {icon: SiCss3, text: ["CSS3", "SASS"]},
    {icon: SiTailwindcss, text: "TailwindCSS"},
    {icon: SiJavascript, text: "Javascript"},
    {icon: SiTypescript, text: "Typescript"},
    {icon: SiVuedotjs, text: ["VueJS", "Router"]},
    {icon: SiNuxtdotjs, text: "Nuxt.js"},
    {text: ["Vuex"]},
    {icon: SiReact, text: "ReactJs"},
];

export const BACKEND_SKILL: Array<SkillInterface> = [
    {icon: SiLaravel, text: "Laravel"},
    {icon: SiPhp, text: "PHP"},
    {text: "PHPUnit"},
];

export const DATABASE_SKILL: Array<SkillInterface> = [
    {icon: SiMysql, text: "Mysql"},
];
