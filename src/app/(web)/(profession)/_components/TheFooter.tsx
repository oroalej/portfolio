import Link from "next/link";
import {
  EMAIL_ADDRESS,
  GITHUB_LINK,
  LINKED_IN_LINK,
  TWITTER_LINK,
} from "@/constants";
import { ExternalLink } from "@/components";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import Container from "@/app/(web)/_components/Container";

const TheFooter = () => (
  <div className="bg-neutral-900 text-neutral-300 rounded-b-lg mb-3.5 py-20">
    <Container>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-1.5 w-full lg:justify-between items-center mb-14">
        <nav className="flex flex-row gap-6 text-sm sm:gap-8 sm:text-base flex-wrap justify-center">
          <Link
            scroll
            href="/"
            className="hover:underline underline-offset-[5px] decoration-4"
          >
            Home
          </Link>

          <Link
            scroll
            href={"/resume"}
            className="hover:underline underline-offset-[5px] decoration-4"
          >
            Résumé
          </Link>
          <Link
            scroll
            href={"/quotes"}
            className="hover:underline underline-offset-[5px] decoration-4"
          >
            Quotes
          </Link>
          <Link
            scroll
            href={"/daydreams"}
            className="hover:underline underline-offset-[5px] decoration-4"
          >
            Daydreams
          </Link>
        </nav>

        <div className="flex flex-col sm:flex-row gap-7 items-center">
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            aria-label="Email"
            title="Email"
            className="hover:text-white transition-colors"
          >
            {EMAIL_ADDRESS}
          </a>

          <div className="flex flex-row gap-7">
            <ExternalLink
              href={GITHUB_LINK}
              label="Github"
              className="hover:text-white transition-colors"
            >
              <SiGithub size={22} />
            </ExternalLink>

            <ExternalLink
              href={LINKED_IN_LINK}
              label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <SiLinkedin size={22} />
            </ExternalLink>

            {/*<ExternalLink href={FACEBOOK_LINK} label="Facebook"*/}
            {/*              className="hover:text-white transition-colors">*/}
            {/*    <Facebook size={22}/>*/}
            {/*</ExternalLink>*/}

            <ExternalLink
              href={TWITTER_LINK}
              label="Twitter"
              className="hover:text-white transition-colors"
            >
              <SiTwitter size={22} />
            </ExternalLink>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 justify-center items-center flex-col sm:flex-row text-sm">
        <span className="flex gap-2 items-center flex-row">
          Designed by
          <Link
            href="/"
            className="hover:underline hover:text-white underline-offset-2 transition-colors"
          >
            Me
          </Link>
        </span>
        <span className="whitespace-nowrap">
          © 2021-{new Date().getFullYear()}
        </span>
      </div>
    </Container>
  </div>
);

export default TheFooter;
