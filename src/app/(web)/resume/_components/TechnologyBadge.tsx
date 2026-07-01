type TechnologyCategory =
  | "frontend"
  | "backend"
  | "data"
  | "aiTools"
  | "workflow"
  | "unknown";

interface TechnologyBadgeProps {
  name: string;
}

interface TechnologyBadgeListProps {
  technologies: string[];
}

const CATEGORY_LABELS: Record<TechnologyCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  data: "Data & APIs",
  aiTools: "AI & Developer Tools",
  workflow: "Workflow & Platforms",
  unknown: "Other",
};

const TECHNOLOGY_CATEGORY_MAP: Record<string, TechnologyCategory> = {
  agile: "workflow",
  angularjs: "frontend",
  "api integration": "data",
  bootstrap: "frontend",
  "claude code": "aiTools",
  "claude code (cli)": "aiTools",
  codeigniter: "backend",
  codex: "aiTools",
  confluence: "workflow",
  css3: "frontend",
  cursor: "aiTools",
  ecmascript: "frontend",
  figma: "workflow",
  "git - version control": "workflow",
  git: "workflow",
  gitlab: "workflow",
  go: "backend",
  golang: "backend",
  graphql: "data",
  html5: "frontend",
  inertia: "frontend",
  javascript: "frontend",
  jquery: "frontend",
  jira: "workflow",
  laravel: "backend",
  magento: "workflow",
  "model-view-controller (mvc)": "backend",
  mvc: "backend",
  mysql: "data",
  nextjs: "frontend",
  "next.js": "frontend",
  php: "backend",
  pinia: "frontend",
  postgresql: "data",
  postman: "workflow",
  pyteal: "backend",
  python: "backend",
  react: "frontend",
  reactjs: "frontend",
  redis: "data",
  "restful apis": "data",
  sass: "frontend",
  scss: "frontend",
  "scss / css3": "frontend",
  scrum: "workflow",
  shadcn: "frontend",
  "single-page application - spa": "frontend",
  "software development life cycle (sdlc)": "workflow",
  spa: "frontend",
  ssr: "frontend",
  supabase: "data",
  "tailwind css": "frontend",
  tailwindcss: "frontend",
  "tanstack query": "frontend",
  "tenstack query": "frontend",
  trello: "workflow",
  typescript: "frontend",
  "vanilla php": "backend",
  vite: "frontend",
  vue: "frontend",
  "vue router": "frontend",
  "vue-router": "frontend",
  "vue2 - option api": "frontend",
  "vue3 - composition api": "frontend",
  vuerouter: "frontend",
  vuetify: "frontend",
  vuex: "frontend",
  "workday platform": "workflow",
  zustand: "frontend",
};

const getTechnologyCategory = (name: string): TechnologyCategory =>
  TECHNOLOGY_CATEGORY_MAP[name.toLowerCase()] ?? "unknown";

export const TechnologyBadge = ({ name }: TechnologyBadgeProps) => {
  const category = getTechnologyCategory(name);
  const categoryLabel = CATEGORY_LABELS[category];

  return (
    <span
      aria-label={`${name}, ${categoryLabel}`}
      className="select-all inline-block bg-neutral-800 text-neutral-200 px-2 leading-none py-1 text-xs whitespace-nowrap rounded"
      title={categoryLabel}
    >
      {name}
    </span>
  );
};

export const TechnologyBadgeList = ({
  technologies,
}: TechnologyBadgeListProps) => {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap gap-1.5">
      {technologies.map((item, index) => (
        <TechnologyBadge key={`${item}-${index}`} name={item} />
      ))}
    </div>
  );
};
