import {ArrowSquareOut, DownloadSimple, EnvelopeSimple} from "phosphor-react";
import {EXPERIENCES, INTEREST, SKILLS} from "@/data/resume"
import {Github, Linkedin} from "@icons-pack/react-simple-icons"
import {kebabCase} from "lodash";
import {Container} from "@/components/index";
import Head from "next/head";

const Resume = () => {
  return (
    <div className="font-sans py-14 md:py-20 lg:pb-32">
      <Container>
        <Head>
          <title>Alexander Jeam Oro - Resume</title>
          <meta name="description" content="Generated by create next app"/>
        </Head>

        <div className="w-full mb-12 lg:mb-6 text-center lg:text-right">
          <a href="/files/Alexander%20Jeam%20Oro.pdf" target="_blank"
             download="Alexander Jeam Oro - Software Engineer.pdf"
             className="inline-flex flex-row gap-1.5 items-center w-fit p-2.5 pr-3 bg-rose-500 hover:bg-rose-600 transition-colors rounded text-white text-sm">
            <DownloadSimple size={24} weight="regular"/>
            <span className="Resume___StyledSpan-sc-3j1ygy-3 bXPZHh">Download</span>
          </a>
        </div>

        <div className="divide-y-2">
          <div className="pb-6 lg:pb-10">
            <h1
              className="text-neutral-700 dark:text-neutral-200 text-xl md:text-4xl lg:text-5xl mb-1 lg:mb-3 font-bold">
              Alexander Jeam O. Oro
            </h1>

            <h3 className="text-neutral-700 dark:text-neutral-200 font-light capitalize lg:text-xl">Software
              Engineer</h3>

            <p className="dark:text-neutral-400 mt-3 lg:mt-6 text-sm lg:text-base">
              Innovative developer with 6 years of experience in object-oriented
              programming, implementing design interfaces, testing, and debugging. Passionate about technology and
              learning new things.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-28 pt-6 lg:pt-10">
            <div className="w-full lg:w-2/3">
              <h2 className="text-lg lg:text-2xl dark:text-neutral-200 text-neutral-700">Professional Experiences</h2>
              {
                EXPERIENCES.map(({company, positions, descriptions}) => {
                  return (
                    <div className="relative block py-3 space-y-0.5 text-sm lg:text-base" key={kebabCase(company)}>
                      <h3 className="text-neutral-700 font-medium dark:text-neutral-200 text-lg">{company}</h3>
                      {
                        positions.map(({title, duration}) => (
                          <div
                            className="flex items-start font-normal flex-col text-neutral-600 md:flex-row md:items-center dark:text-neutral-400 pb-2 lg:pb-0"
                            key={kebabCase(`${company} ${title}`)}>
                            <span className="md:pr-2">{title}</span>
                            <span className="w-0.5 h-3.5 relative bg-neutral-400 hidden md:block"/>
                            <span className="md:pl-2">{duration.start} - {duration.end}</span>
                          </div>
                        ))
                      }

                      <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-200 space-y-2">
                        {
                          descriptions.map((description, index) => (
                            <li key={kebabCase(`${company} ${index}`)}>{description}</li>
                          ))
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </div>

            <div className="w-full lg:w-1/3 space-y-5 mt-4 lg:mt-0">
              <div className="relative">
                <h2 className="text-lg lg:text-2xl dark:text-neutral-200 text-neutral-700 mb-2">Contacts</h2>

                <div className="space-y-2">
                  <div className="flex items-center flex-row text-neutral-700 dark:text-neutral-200 space-x-1">
                    <EnvelopeSimple weight="regular" size={24}/>
                    <a href="mailto:alexanderjeamoro@gmail.com"
                       className="hover:underline text-sm lg:text-base">alexanderjeamoro@gmail.com</a>
                  </div>

                  <div className="flex items-center flex-row text-neutral-700 dark:text-neutral-200 space-x-1.5">
                    <Linkedin size={22}/>
                    <a href="https://www.linkedin.com/in/alexander-jeam-oro/" rel="noreferrer" target="_blank"
                       className="hover:underline inline-flex flex-wrap flex-row items-start group text-sm lg:text-base">
                      <span>@alexander-jeam-oro/</span>
                      <ArrowSquareOut size={14} weight="bold"
                                      className="ml-1 transition-opacity duration-75 opacity-0 group-hover:opacity-100 text-red-500"/>
                    </a>
                  </div>

                  <div className="flex items-center flex-row text-neutral-700 dark:text-neutral-200 space-x-1.5">
                    <Github size={22}/>

                    <a href="https://github.com/oroalej" rel="noreferrer" target="_blank"
                       className="hover:underline inline-flex flex-wrap flex-row items-start group text-sm lg:text-base">
                      <span>@oroalej</span>
                      <ArrowSquareOut size={14} weight="bold"
                                      className="ml-1 transition-opacity duration-75 opacity-0 group-hover:opacity-100 text-red-500"/>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg lg:text-2xl dark:text-neutral-200 text-neutral-700">Education</h2>

                <div className="space-y-1.5">
                  <p className="font-medium mt-3 text-neutral-700 dark:text-neutral-200 text-sm lg:text-base">Ateneo de
                    Naga University</p>
                  <span className="block text-neutral-600 dark:text-neutral-400 text-sm lg:text-base">B.S Information Technology</span>
                  <span className="block text-neutral-600 dark:text-neutral-400 text-sm lg:text-base">2009 - 2015</span>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg lg:text-2xl dark:text-neutral-200 text-neutral-700">Skills</h2>

                <div
                  className="relative grid grid-cols-2 grid-flow-row py-3 gap-1.5 w-full text-gray-700 dark:text-gray-200 capitalize">
                  {SKILLS.map(entry => <span key={kebabCase(entry)} className="text-sm lg:text-base">{entry}</span>)}
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg lg:text-2xl dark:text-neutral-200 text-neutral-700">Interests</h2>

                <div
                  className="relative grid grid-cols-2 grid-flow-row py-3 gap-1.5 w-full text-gray-700 dark:text-gray-200 text-sm lg:text-base">
                  {INTEREST.map(entry => <span key={entry}>{entry}</span>)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Resume;