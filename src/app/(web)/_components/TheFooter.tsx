"use client";

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
import classNames from "classnames";
import { usePathname } from "next/navigation";

const TheFooter = () => {
  const pathname = usePathname();

  return (
    <div className="bg-neutral-900 text-neutral-300 rounded-b-lg py-20">
      <Container>
        <div className="flex flex-col gap-8 xl:flex-row xl:gap-1.5 w-full md:justify-between items-center mb-14">
          <nav className="flex flex-col gap-5 lg:flex-row text-sm sm:gap-8 flex-wrap justify-center items-center">
            <div className="flex flex-row gap-6 text-sm sm:gap-8 sm:text-base flex-wrap justify-center items-center">
              <Link
                scroll
                href={"/"}
                className={classNames(
                  "border-b-4 hover:border-white border-transparent py-2 px-2.5 uppercase",
                  [pathname === "/" ? "border-white" : "border-transparent"]
                )}
              >
                Home
              </Link>

              <Link
                scroll
                href={"/resume"}
                className={classNames(
                  "border-b-4 hover:border-white border-transparent py-2 px-2.5 uppercase",
                  [
                    pathname.startsWith("/resume")
                      ? "border-white"
                      : "border-transparent",
                  ]
                )}
              >
                Résumé
              </Link>

              <Link
                scroll
                href={"/projects"}
                className={classNames(
                  "border-b-4 hover:border-white border-transparent py-2 px-2.5 uppercase",
                  [
                    pathname.startsWith("/projects")
                      ? "border-white"
                      : "border-transparent",
                  ]
                )}
              >
                Projects
              </Link>
            </div>

            <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-neutral-400" />

            <div className="flex flex-row gap-6 text-sm sm:gap-8 sm:text-base flex-wrap justify-center items-center">
              <Link
                scroll
                href={"/quotes"}
                className={classNames(
                  "border-b-4 hover:border-white border-transparent py-2 px-2.5 uppercase",
                  [
                    pathname.startsWith("/quotes")
                      ? "border-white"
                      : "border-transparent",
                  ]
                )}
              >
                Quotes
              </Link>

              <Link
                scroll
                href={"/daydreams"}
                className={classNames(
                  "border-b-4 hover:border-white border-transparent py-2 px-2.5 uppercase",
                  [
                    pathname.startsWith("/daydreams")
                      ? "border-white"
                      : "border-transparent",
                  ]
                )}
              >
                Daydreams
              </Link>
            </div>
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
        <div className="flex gap-1.5 justify-center items-center flex-row text-sm">
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
};
export default TheFooter;
