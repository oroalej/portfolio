import {ProjectInterface} from "@/components/Project/ProjectCard";

export const PROJECT_LIST: Array<ProjectInterface> = [
  {
    title: 'Expense Tracker',
    description: 'This is a ongoing personal project. I create this to refresh my skills in Laravel and to test how to do Test Driven Design (TDD), Testing in general, Action Pattern, Data Transfer Object (DTO), and OOP Fluent Interface. And also since I am now handling the expense at our house, I want to create a tracker that suited my need.',
    uses: [
      'Laravel', 'Unit Testing', 'GraphQL', 'Typescript', 'ReactJS', 'NextJS', 'Redux', 'Tailwind CSS'
    ],
  },
  {
    title: 'alexanderjeamoro',
    description: "A revamp portfolio of mine. A virtual world I can confidently say my creation.",
    source: 'https://github.com/oroalej/portfolio',
    uses: [
      'Tailwind CSS', 'ReactJS', 'NextJS', 'Typescript'
    ]
  },
  {
    title: 'intothealgoverse',
    description: "Is an unofficial curation of tools, projects, and resources that are relevant to the Algorand ecosystem. ",
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
    description: 'MVP of a system as a software customer loyalty program platform for small and medium-sized enterprises.',
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
    description: 'A 5 repository project that are interconnected with one other. I was responsible for maintaining and enhancing the project depending on what the client wants.',
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
    description: 'A point of sale, inventory, reports, sales return system that will be used internally by a local poultry farm.',
    uses: [
      'Codeigniter', 'Bootstrap'
    ]
  },
  {
    title: 'POS system for Local Burger Business',
    description: 'A Point of sale system that will be used by a local burger business.',
    uses: [
      'Laravel', 'Bootstrap'
    ]
  }
];

