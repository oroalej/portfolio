import {ProjectInterface} from "@/components/Project/ProjectCard";

export const PROJECT_LIST: Array<ProjectInterface> = [
  {
    title: 'Expense Tracker',
    description: 'This is a ongoing personal project. I created this to refresh my skills in Laravel and to practice test driven design (TDD), testing in general, action pattern, data transfer object (DTO), and OOP fluent interface. This project was also created to suit my needs as I am now managing the finances at home.',
    uses: [
      'Laravel', 'Unit Testing', 'GraphQL', 'Typescript', 'ReactJS', 'NextJS', 'Redux', 'Tailwind CSS'
    ],
  },
  {
    title: 'alexanderjeamoro',
    description: "This is a revamped portfolio of mine. A virtual world I can confidently say is  my creation.\n",
    source: 'https://github.com/oroalej/portfolio',
    uses: [
      'Tailwind CSS', 'ReactJS', 'NextJS', 'Typescript'
    ]
  },
  {
    title: 'intothealgoverse',
    description: "This is an unofficial curation of tools, projects, and resources that are relevant to the Algorand ecosystem.",
    image: 'intothealgoverse/intothealgoverse-about.jpg',
    source: 'https://github.com/oroalej/intothealgoverse',
    site: 'https://oroalej.github.io/intothealgoverse/#/',
    uses: [
      'Tailwind CSS', 'ReactJS', 'ReactRouter'
    ],
    screenshots: [
      {
        title: 'about-page',
        filename: 'intothealgoverse/intothealgoverse-about.jpg',
        width: 1920,
        height: 941
      }, {
        title: 'decentralized-application-page',
        filename: 'intothealgoverse/intothealgoverse-dapp.jpg',
        width: 96,
        height: 133
      }, {
        title: 'homepage',
        filename: 'intothealgoverse/intothealgoverse-homepage.jpg',
        width: 1920,
        height: 1608
      }
    ]
  },
  {
    title: 'Suki Reward App',
    description: 'This is an MVP of a system-as-a-software customer loyalty program platform for small and medium enterprises.',
    image: 'suki/suki-reward-add-partner.jpg',
    uses: [
      'Laravel', 'VueJS', 'Inertia', 'Tailwind CSS'
    ],
    screenshots: [
      {
        title: 'add-partner',
        filename: 'suki/suki-reward-add-partner.jpg',
        width: 1920,
        height: 1378
      }, {
        title: 'review-campaigns',
        filename: 'suki/suki-reward-review-campaigns.jpg',
        width: 1920,
        height: 1098
      }, {
        title: 'review-partner',
        filename: 'suki/suki-reward-review-partner.jpg',
        width: 1920,
        height: 867
      }
    ]
  },
  {
    title: 'E-Learning and content management system',
    description: 'A 5-repository project where the repositories are interconnected with each other. I was responsible for maintaining and enhancing the project depending on client requirements.',
    uses: [
     'Laravel', 'VueJS', 'AngularJS', 'GoLang', 'Vanilla PHP'
    ]
  },
  {
    title: 'Thriving-in-between',
    description: 'A simple content management system. The backend design was inspired by wordpress.com.',
    image: 'thriving-in-between/thriving-in-between-blog.jpg',
    site: 'https://thriving-in-between.com/',
    uses: [
      'Laravel', 'VueJS', 'Vuex', 'Vuetify', 'VueRouter'
    ],
    screenshots: [
      {
        title: 'blog-page',
        filename: 'thriving-in-between/thriving-in-between-blog.jpg',
        width: 1920,
        height: 1986
      }, {
        title: 'homepage',
        filename: 'thriving-in-between/thriving-in-between-homepage.jpg',
        width: 1920,
        height: 1896
      },
      {
        title: 'backend-blog-list',
        filename: 'thriving-in-between/thriving-in-between-backend-blog-list.jpg',
        width: 1902,
        height: 941
      }, {
        title: 'backend-create-blog',
        filename: 'thriving-in-between/thriving-in-between-backend-create-blog.jpg',
        width: 1905,
        height: 940
      }, {
        title: 'backend-gallery',
        filename: 'thriving-in-between/thriving-in-between-backend-gallery.jpg',
        width: 1903,
        height: 938
      }, {
        title: 'backend-gallery-page',
        filename: 'thriving-in-between/thriving-in-between-backend-gallery-page.jpg',
        width: 1900,
        height: 938
      }, {
        title: 'backend-gallery-preview',
        filename: 'thriving-in-between/thriving-in-between-backend-gallery-preview.jpg',
        width: 1902,
        height: 938
      }
    ]
  },
  {
    title: 'Poultry farm internal system',
    description: 'A point-of-sale, inventory, reports, and sales return system to be used internally by a local poultry farm.',
    uses: [
      'Codeigniter', 'Bootstrap'
    ]
  },
  {
    title: 'POS system for Local Burger Business',
    description: 'A point-of-sale system to be used by a local burger business.',
    uses: [
      'Laravel', 'Bootstrap'
    ]
  }
];

