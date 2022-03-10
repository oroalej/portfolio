import {
  CodeBlock,
  Container,
  ExternalLink,
  FauxMenu,
  MultiLineComment,
  Object,
  SingleLineComment
} from "@/components/index";
import {ArrowSquareOut} from "phosphor-react";

const PortfolioSummary = () => {
  const primary_skills = ['Laravel', 'PHP', 'Javascript', 'Typescript', 'VueJS'];

  return (
    <div className="py-14 lg:pb-32 lg:pt-16">
      <Container>
        <div className="flex items-center">
          <div
            className="text-xs sm:text-base flex flex-col flex-wrap gap-5 min-h-full tracking-normal bg-neutral-800 dark:bg-neutral-900 transition-colors px-3 sm:pl-6 sm:pr-8 py-6 rounded-lg shadow-xl mx-auto">
            <FauxMenu/>

            <div className="leading-loose flex flex-row gap-3 sm:gap-8 relative">
              <code className="flex gap-0.5 flex-col justify-start relative text-gray-50 tracking-wide">
                <MultiLineComment>
                  {`Thanks for visiting my portfolio,`}
                  {`Don't wanna waste your time, so here's the summary.👌🏼`}
                </MultiLineComment>

                <CodeBlock line={6}>
                  <span className="text-purple-600 mr-2">const</span>
                  <span className="text-gray-400">portfolioSummary</span>
                  <span className="mx-2 text-white">=</span>
                  <span className="text-yellow-400">{"{"}</span>
                </CodeBlock>

                <CodeBlock line={7} className="ml-2 sm:ml-4">
                  <Object name="name">
              <span className="text-green-400 mr-0.5">
                {`'`}
                <span className="select-all">
                    <span className="underline underline-offset-2 decoration-4">Alex</span>
                    <span>ander Jeam Oro</span>
                  </span>
                {`'`}
              </span>
                  </Object>
                </CodeBlock>

                <CodeBlock line={8} className="ml-2 sm:ml-4">
                  <Object name="experience">
                    <span className="text-green-400 mr-0.5">
                      {`'`}
                      <span className="select-all">6 years</span>
                      {`'`}
                    </span>
                  </Object>
                </CodeBlock>

                <CodeBlock line={9} className="ml-2 sm:ml-4">
                  <Object name="software_engineer">
                    <span className="text-purple-600 mr-0.5">true</span>
                  </Object>
                </CodeBlock>

                <CodeBlock line={10} className="ml-2 sm:ml-4">
                  <Object name="skills" isLast>
                    <span className="text-yellow-400">{"["}</span>
                  </Object>
                </CodeBlock>

                <CodeBlock line={11} className="ml-4 sm:ml-8">
                  {
                    primary_skills.map(skill => (
                      <div key={skill}>
                  <span className=" text-green-400">
                    {`'`}
                    <span className="select-all capitalize">{skill}</span>
                    {`'`}
                  </span>
                        <span className="text-gray-100 mr-2">,</span>
                      </div>
                    ))
                  }
                </CodeBlock>

                <CodeBlock line={13} className="ml-4 sm:ml-8">
                  <SingleLineComment>GOLang, Python, GraphQL, ReactJS</SingleLineComment>
                </CodeBlock>

                <CodeBlock line={12} className="ml-4 sm:ml-8">
                  <SingleLineComment>
                    <a href="#what-i-use" className="cursor-pointer">
                      <span className="uppercase hover:text-rose-500 transition-colors">{`->> See more <<-`}</span>
                    </a>
                  </SingleLineComment>
                </CodeBlock>

                <CodeBlock line={14} className="ml-2 sm:ml-4">
                  <span className="text-yellow-400">{"]"}</span>
                </CodeBlock>

                <CodeBlock line={15} className="ml-2 sm:ml-4">
                  <Object name="contacts" isLast>
                    <span className="text-green-400">{"{"}</span>
                  </Object>
                </CodeBlock>

                <CodeBlock line={16} className="ml-4 sm:ml-8">
                  <Object name="linked_in">
                    <ExternalLink href="https://www.linkedin.com/in/alexander-jeam-oro/"
                                  className="text-green-400 ml-1 sm:ml-2 inline-flex hover:text-green-500 transition-colors">
                      {`'`}<span className="hover:text-opacity-80">@alexander-jeam-oro</span>{`'`}
                      <ArrowSquareOut size={12} weight="bold"
                                      className="ml-1 transition-opacity duration-75 text-rose-500 self-start mt-2"/>
                    </ExternalLink>
                  </Object>
                </CodeBlock>

                <CodeBlock line={17} className="ml-4 sm:ml-8">
                  <Object name="github">
                    <ExternalLink href="https://github.com/oroalej"
                                  className="text-green-400 ml-1 sm:ml-2 inline-flex hover:text-green-500 transition-colors">
                      {`'`}<span className="hover:text-opacity-80">@oroalej</span>{`'`}
                      <ArrowSquareOut size={12} weight="bold"
                                      className="ml-1 transition-opacity duration-75 text-rose-500 self-start mt-2"/>
                    </ExternalLink>
                  </Object>
                </CodeBlock>

                <CodeBlock line={18} className="ml-4 sm:ml-8">
                  <Object name="email" isLast>
                    <a href="mailto:alexanderjeamoro@gmail.com" className="text-green-400">
                      {`'`}<span className="select-all">alexanderjeamoro@gmail.com</span>{`'`}
                    </a>
                  </Object>
                </CodeBlock>

                <CodeBlock line={19} className="ml-2 sm:ml-4">
                  <span className="text-green-400">{"}"}</span>
                </CodeBlock>

                <CodeBlock line={20}>
                  <span className="text-yellow-400">{"}"}</span>
                </CodeBlock>

                <CodeBlock line={21}>
                  <span
                    className="border-l-[3px] h-[1rem] sm:h-[1.25rem] border-solid self-end animate-typewriter mb-3 sm:mb-2">
                    <span className="invisible">.</span>
                  </span>
                </CodeBlock>

                <CodeBlock line={22}/>
              </code>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PortfolioSummary;
