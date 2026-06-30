export interface PortfolioSummary {
  name: string;
  nickname: string;
  experience: string;
  isSoftwareEngineer: boolean;
  skills: string[];
  contacts: {
    linkedIn: {
      display: string;
      href: string;
      label: string;
    };
    email: {
      address: string;
      href: string;
    };
    resume: {
      display: string;
      download: string;
      href: string;
      label: string;
    };
  };
}

export const PORTFOLIO_SUMMARY: PortfolioSummary = {
  name: "Alexander Jeam Oro",
  nickname: "Alex",
  experience: "9 years",
  isSoftwareEngineer: true,
  skills: ["Laravel", "PHP", "Javascript", "Typescript", "VueJS", "ReactJS"],
  contacts: {
    linkedIn: {
      display: "@alexander-jeam-oro",
      href: "https://www.linkedin.com/in/alexander-jeam-oro/",
      label: "Alexander Jeam Oro on LinkedIn",
    },
    email: {
      address: "alexanderjeamoro@gmail.com",
      href: "mailto:alexanderjeamoro@gmail.com",
    },
    resume: {
      display: "Download",
      download: "alexander-jeam-oro-resume.pdf",
      href: "/alexander-jeam-oro-resume.pdf",
      label: "Download Alexander Jeam Oro resume",
    },
  },
};
