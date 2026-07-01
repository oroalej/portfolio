"use client";

import {
  CodeLanguage,
  CodeLine,
  CodeProperty,
  CodeToken,
  ExternalLink,
  getCodeTokenClassName,
  MultiLineComment,
  SingleLineComment,
} from "@/components";
import { PORTFOLIO_SUMMARY } from "@/data";
import classNames from "classnames";
import { ComponentType, ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

interface PortfolioSummaryCodeProps {
  language?: CodeLanguage;
}

interface LanguageComponentProps {
  language: CodeLanguage;
}

interface CodeStringProps extends LanguageComponentProps {
  children: ReactNode;
  className?: string;
}

const COMMENT_LINES = [
  "Thanks for visiting my portfolio,",
  "Don't wanna waste your time, so here's the summary.👌🏼",
];

const PHP_OPERATOR_SPACING = "mx-2";

const CodeString = ({ children, className, language }: CodeStringProps) => (
  <CodeToken
    type="string"
    language={language}
    className={classNames("mr-0.5", className)}
  >
    {`'`}
    {children}
    {`'`}
  </CodeToken>
);

const CodeComma = ({ language }: LanguageComponentProps) => (
  <CodeToken type="operator" language={language} className="mr-2">
    ,
  </CodeToken>
);

const PortfolioNameString = ({ language }: LanguageComponentProps) => {
  const nameSuffix = PORTFOLIO_SUMMARY.name.slice(
    PORTFOLIO_SUMMARY.nickname.length
  );

  return (
    <CodeString language={language}>
      <span className="select-all">
        <span
          data-tooltip-id="guest-tooltip"
          data-tooltip-content="Yes, that's my nickname."
          className="underline underline-offset-2 decoration-4"
        >
          {PORTFOLIO_SUMMARY.nickname}
        </span>

        <span>{nameSuffix}</span>
      </span>
    </CodeString>
  );
};

const SkillsLine = ({ language }: LanguageComponentProps) => (
  <>
    {PORTFOLIO_SUMMARY.skills.map((skill, index) => (
      <div key={skill}>
        <CodeString language={language}>
          <span className="select-all capitalize">{skill}</span>
        </CodeString>

        {index < PORTFOLIO_SUMMARY.skills.length - 1 && (
          <CodeComma language={language} />
        )}
      </div>
    ))}
  </>
);

const SeeMoreComment = ({ language }: LanguageComponentProps) => (
  <SingleLineComment language={language}>
    <a href="#what-i-use" className="cursor-pointer">
      <span className="uppercase hover:text-rose-500 transition-colors">{`->> See full stack <<-`}</span>
    </a>
  </SingleLineComment>
);

const LinkedInValue = ({ language }: LanguageComponentProps) => {
  const { linkedIn } = PORTFOLIO_SUMMARY.contacts;

  return (
    <ExternalLink
      href={linkedIn.href}
      label={linkedIn.label}
      className={getCodeTokenClassName(
        "string",
        language,
        "ml-1 sm:ml-2 inline-flex hover:text-green-500 transition-colors"
      )}
    >
      {`'`}
      <span className="hover:text-opacity-80">{linkedIn.display}</span>
      {`'`}

      <FiExternalLink
        size={12}
        className="ml-1 transition-opacity duration-75 text-rose-500 self-start mt-2"
      />
    </ExternalLink>
  );
};

const ResumeValue = ({ language }: LanguageComponentProps) => {
  const { resume } = PORTFOLIO_SUMMARY.contacts;

  return (
    <a
      aria-label={resume.label}
      className={getCodeTokenClassName(
        "string",
        language,
        "inline-flex hover:text-green-500 transition-colors"
      )}
      download={resume.download}
      href={resume.href}
      title={resume.label}
    >
      {`'`}
      <span className="select-all">{resume.display}</span>
      {`'`}
    </a>
  );
};

const EmailValue = ({ language }: LanguageComponentProps) => {
  const { email } = PORTFOLIO_SUMMARY.contacts;

  return (
    <a
      href={email.href}
      className={getCodeTokenClassName("string", language)}
    >
      {`'`}
      <span className="select-all">{email.address}</span>
      {`'`}
    </a>
  );
};

const JavaScriptPortfolioSummaryCode = () => {
  const language: CodeLanguage = "javascript";

  return (
    <>
      <MultiLineComment language={language} withTrailingBlankLine>
        {COMMENT_LINES.map((comment) => comment)}
      </MultiLineComment>

      <CodeLine line={6}>
        <CodeToken type="keyword" language={language} className="mr-2">
          const
        </CodeToken>
        <CodeToken type="variable" language={language}>
          portfolioSummary
        </CodeToken>
        <CodeToken type="operator" language={language} className="mx-2">
          =
        </CodeToken>
        <CodeToken type="punctuation" language={language}>
          {"{"}
        </CodeToken>
      </CodeLine>

      <CodeLine line={7} indent={1}>
        <CodeProperty name="name" language={language}>
          <PortfolioNameString language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={8} indent={1}>
        <CodeProperty name="experience" language={language}>
          <CodeString language={language}>
            <span className="select-all">{PORTFOLIO_SUMMARY.experience}</span>
          </CodeString>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={9} indent={1}>
        <CodeProperty name="software_engineer" language={language}>
          <CodeToken type="boolean" language={language} className="mr-0.5">
            {PORTFOLIO_SUMMARY.isSoftwareEngineer ? "true" : "false"}
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={10} indent={1}>
        <CodeProperty
          name="skills"
          language={language}
          withTrailingComma={false}
        >
          <CodeToken type="punctuation" language={language}>
            [
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={11} indent={2}>
        <SkillsLine language={language} />
      </CodeLine>

      <CodeLine line={12} indent={2}>
        <SeeMoreComment language={language} />
      </CodeLine>

      <CodeLine line={14} indent={1}>
        <CodeToken type="punctuation" language={language}>
          ]
        </CodeToken>
        <CodeComma language={language} />
      </CodeLine>

      <CodeLine line={15} indent={1}>
        <CodeProperty
          name="contacts"
          language={language}
          withTrailingComma={false}
        >
          <CodeToken type="punctuation" language={language}>
            {"{"}
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={16} indent={2}>
        <CodeProperty name="linked_in" language={language}>
          <LinkedInValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={17} indent={2}>
        <CodeProperty name="resume" language={language}>
          <ResumeValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={18} indent={2}>
        <CodeProperty
          name="email"
          language={language}
          withTrailingComma={false}
        >
          <EmailValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={19} indent={1}>
        <CodeToken type="punctuation" language={language}>
          {"}"}
        </CodeToken>
      </CodeLine>

      <CodeLine line={20}>
        <CodeToken type="punctuation" language={language}>
          {"}"}
        </CodeToken>
      </CodeLine>
    </>
  );
};

const PhpPortfolioSummaryCode = () => {
  const language: CodeLanguage = "php";

  return (
    <>
      <MultiLineComment language={language} withTrailingBlankLine>
        {COMMENT_LINES.map((comment) => comment)}
      </MultiLineComment>

      <CodeLine line={6}>
        <CodeToken type="variable" language={language}>
          $portfolioSummary
        </CodeToken>
        <CodeToken type="operator" language={language} className="mx-2">
          =
        </CodeToken>
        <CodeToken type="punctuation" language={language}>
          [
        </CodeToken>
      </CodeLine>

      <CodeLine line={7} indent={1}>
        <CodeProperty
          name="'name'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
        >
          <PortfolioNameString language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={8} indent={1}>
        <CodeProperty
          name="'experience'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
        >
          <CodeString language={language}>
            <span className="select-all">{PORTFOLIO_SUMMARY.experience}</span>
          </CodeString>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={9} indent={1}>
        <CodeProperty
          name="'software_engineer'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
        >
          <CodeToken type="boolean" language={language} className="mr-0.5">
            {PORTFOLIO_SUMMARY.isSoftwareEngineer ? "true" : "false"}
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={10} indent={1}>
        <CodeProperty
          name="'skills'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
          withTrailingComma={false}
        >
          <CodeToken type="punctuation" language={language}>
            [
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={11} indent={2}>
        <SkillsLine language={language} />
      </CodeLine>

      <CodeLine line={12} indent={2}>
        <SeeMoreComment language={language} />
      </CodeLine>

      <CodeLine line={14} indent={1}>
        <CodeToken type="punctuation" language={language}>
          ]
        </CodeToken>
        <CodeComma language={language} />
      </CodeLine>

      <CodeLine line={15} indent={1}>
        <CodeProperty
          name="'contacts'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
          withTrailingComma={false}
        >
          <CodeToken type="punctuation" language={language}>
            [
          </CodeToken>
        </CodeProperty>
      </CodeLine>

      <CodeLine line={16} indent={2}>
        <CodeProperty
          name="'linked_in'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
        >
          <LinkedInValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={17} indent={2}>
        <CodeProperty
          name="'resume'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
        >
          <ResumeValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={18} indent={2}>
        <CodeProperty
          name="'email'"
          language={language}
          operator="=>"
          operatorClassName={PHP_OPERATOR_SPACING}
          withTrailingComma={false}
        >
          <EmailValue language={language} />
        </CodeProperty>
      </CodeLine>

      <CodeLine line={19} indent={1}>
        <CodeToken type="punctuation" language={language}>
          ]
        </CodeToken>
      </CodeLine>

      <CodeLine line={20}>
        <CodeToken type="punctuation" language={language}>
          ]
        </CodeToken>
        <CodeToken type="operator" language={language}>
          ;
        </CodeToken>
      </CodeLine>
    </>
  );
};

const portfolioSummaryCodeRenderers: Record<
  CodeLanguage,
  ComponentType
> = {
  javascript: JavaScriptPortfolioSummaryCode,
  php: PhpPortfolioSummaryCode,
};

export const PortfolioSummaryCode = ({
  language = "javascript",
}: PortfolioSummaryCodeProps) => {
  const SummaryCodeRenderer = portfolioSummaryCodeRenderers[language];

  return (
    <>
      <SummaryCodeRenderer />

      <CodeLine line={21}>
        <span
          aria-hidden="true"
          className="border-l-[3px] h-[1rem] sm:h-[1.25rem] border-solid self-end animate-blinking mb-3 sm:mb-2"
        >
          <span className="invisible">.</span>
        </span>
      </CodeLine>

      <CodeLine line={22} />
    </>
  );
};
