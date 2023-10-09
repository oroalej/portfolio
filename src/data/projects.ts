import {ProjectInterface} from "@/components/../components/Project/ProjectCard";

export const PROJECT_LIST: Array<ProjectInterface> = [
  {
    title: 'intothealgoverse 2.0',
    type: "personal",
    description: "Updating the previous project to community based curation via voting. Integrating Algorand blockchain and its ecosystem",
    uses: [
      'HTML5', 'CSS3', 'TailwindCSS', 'Javascript', 'NextJS', 'React', 'Typescript', 'Redux-RTK', 'Supabase', 'Postgresql', 'js-algorand-sdk'
    ],
    image: 'intothealgoverse_v2/dapp-about.jpg',
    screenshots: [
      {
        title: 'contributor-profile',
        filename: 'intothealgoverse_v2/contributor-profile.jpg',
        width: 1920,
        height: 1306
      },
      {
        title: 'dapp-members',
        filename: 'intothealgoverse_v2/dapp-members.jpg',
        width: 1920,
        height: 1215
      },
      {
        title: 'dapp-about',
        filename: 'intothealgoverse_v2/dapp-about.jpg',
        width: 1920,
        height: 1345
      }
    ]
  },
  {
    title: 'Expense Tracker',
    type: "personal",
    description: 'This is a ongoing personal project. I created this to refresh my skills in Laravel and to practice test driven design (TDD), testing in general, action pattern, data transfer object (DTO), and OOP fluent interface. This project was also created to suit my needs as I am now managing the finances at home.',
    uses: [
      'HTML5', 'CSS3', 'TailwindCSS', 'PHP', 'Laravel', 'Unit Testing', 'GraphQL', 'Typescript', 'ReactJS', 'NextJS', 'Redux-RTK', 'MySQL', 'Restful APIs', 'Git - Version Control', 'Model-View-Controller (MVC)'
    ],
    image: 'expense-tracker/account-page.png',
    screenshots: [
      {
        title: 'account-page',
        filename: 'expense-tracker/account-page.png',
        width: 1920,
        height: 937
      },
      {
        title: 'add-transaction-form',
        filename: 'expense-tracker/add-transaction-form.png',
        width: 1920,
        height: 937
      },
      {
        title: 'budget-page',
        filename: 'expense-tracker/budget-page.png',
        width: 1920,
        height: 937
      },
      {
        title: 'goal-page',
        filename: 'expense-tracker/goal-page.png',
        width: 1920,
        height: 937
      },
      {
        title: 'sidebar-closed',
        filename: 'expense-tracker/sidebar-closed.png',
        width: 1920,
        height: 937
      }
    ]
  },
  {
    title: 'alexanderjeamoro',
    type: "personal",
    description: "This is a revamped portfolio of mine. A virtual world I can confidently say is  my creation.\n",
    source: 'https://github.com/oroalej/portfolio',
    site: 'https://alexanderjeamoro.vercel.app/',
    uses: [
      'HTML5', 'CSS3', 'TailwindCSS', 'Javascript', 'ReactJS', 'NextJS', 'Typescript', 'Supabase', 'Git - Version Control'
    ]
  },
  {
    title: 'Algorand NFT Marketplace',
    type: "personal",
    description: "I wanted to support the Algorand cryptocurrency ecosystem by creating a project using their blockchain. It was on its designing phase when my colleagues whom I was supposed to build the project with became busy. Hence, the project is currently on hold. I'm responsible for blockchain integration and assistance of UI Design",
    design: 'https://www.figma.com/proto/0KQUWJDeo48YAsFYWy8Wl5/NFT-Marketplace?page-id=109%3A2&node-id=327%3A2246',
    uses: [
      'Python', 'VueJS', 'PyTeal', 'NuxtJS', 'TailwindCSS'
    ],
  },
  {
    title: 'intothealgoverse 1.0',
    type: "personal",
    description: "This is an unofficial curation of tools, projects, and resources that are relevant to the Algorand ecosystem.",
    image: 'intothealgoverse/intothealgoverse-about.jpg',
    source: 'https://github.com/oroalej/intothealgoverse',
    site: 'https://oroalej.github.io/intothealgoverse/#/',
    uses: [
      'HTML5', 'CSS3', 'TailwindCSS', 'Javascript', 'ReactJS', 'ReactRouter'
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
    type: "freelance",
    description: 'This is an MVP of a system-as-a-software customer loyalty program platform for small and medium enterprises.',
    image: 'suki/suki-reward-add-partner.jpg',
    uses: [
      'HTML5', 'CSS3', 'PHP', 'Laravel', 'Javascript', 'VueJS', 'Inertia', 'TailwindCSS', 'MySQL', 'Git - Version Control', 'Model-View-Controller (MVC)'
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
    title: 'Thriving-in-between',
    type: "freelance",
    description: 'A simple content management system. The backend design was inspired by wordpress.com.',
    image: 'thriving-in-between/thriving-in-between-blog.jpg',
    site: 'https://thriving-in-between.com/',
    uses: [
      'HTML5', 'CSS3', 'Sass', 'PHP', 'Laravel', 'Javascript', 'VueJS', 'Vuex', 'Vuetify', 'VueRouter', 'MySQL', 'Restful APIs', 'Git - Version Control', 'Model-View-Controller (MVC)'
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
    type: "freelance",
    description: 'A point-of-sale, inventory, reports, and sales return system to be used internally by a local poultry farm.',
    uses: [
      'HTML5', 'CSS3', 'Codeigniter', 'Bootstrap', 'Javascript', 'JQuery', 'MySQL', 'Model-View-Controller (MVC)'
    ]
  }
];

