import {Fragment} from "react";
import {EMAIL_ADDRESS, FACEBOOK_LINK, GITHUB_LINK, LINKED_IN_LINK, TWITTER_LINK} from "@/constants/index";
import {ExternalLink, Projects, SectionTitle, SectionWrapper} from "@/components/index";
import {Facebook, Github, Linkedin, Twitter} from "@icons-pack/react-simple-icons";
import Skills from "@/components/Skills";
import PortfolioSummary from "@/components/PortfolioSummary";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <Fragment>
      <PortfolioSummary />
      <AboutMe />
      <Projects/>
      <Skills />

      <SectionWrapper className="rounded-tl-lg rounded-tr-lg bg-neutral-900 text-neutral-300" id="contacts">
        <SectionTitle className="text-xl" anchor="#contacts">
          Contact
        </SectionTitle>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Get in touch</h2>

        <p className="text-sm xs:text-base mb-2 text-opacity-80 md:w-2/3">
          I am only accepting remote work as I am currently residing in the province. If you have open positions that you think will fit well with my skill set or if you have any questions, please feel free to contact me using any of the methods below.
        </p>

        <div className="text-sm sm:text-base mt-10">
          <p className="mb-1">Email:</p>
          <a href={`mailto:${EMAIL_ADDRESS}`} className="mb-8 inline-block hover:text-white">{EMAIL_ADDRESS}</a>

          <div className="flex flex-row gap-8">
            <ExternalLink href={GITHUB_LINK} label="Github" className="hover:text-white transition-colors">
              <Github size={22}/>
            </ExternalLink>

            <ExternalLink href={LINKED_IN_LINK} label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin size={22}/>
            </ExternalLink>

            <ExternalLink href={FACEBOOK_LINK} label="Facebook" className="hover:text-white transition-colors">
              <Facebook size={22}/>
            </ExternalLink>

            <ExternalLink href={TWITTER_LINK} label="Twitter" className="hover:text-white transition-colors">
              <Twitter size={22}/>
            </ExternalLink>
          </div>
        </div>
      </SectionWrapper>
    </Fragment>
  )
}
