"use client";

import Container from "@/app/(web)/_components/Container";
import { CodeLanguage, FauxMenu } from "@/components";
import classNames from "classnames";
import { useState } from "react";
import { PortfolioSummaryCode } from "./PortfolioSummaryCode";

interface PortfolioSummarySectionProps {
  language?: CodeLanguage;
}

const LANGUAGE_OPTIONS = [
  {
    activeClassName: "bg-neutral-700 text-yellow-400 ring-yellow-400/30",
    label: "JS",
    language: "javascript",
    tooltip: "JavaScript",
  },
  {
    activeClassName: "bg-neutral-700 text-rose-500 ring-rose-500/30",
    label: "PHP",
    language: "php",
    tooltip: "PHP",
  },
] satisfies Array<{
  activeClassName: string;
  label: string;
  language: CodeLanguage;
  tooltip: string;
}>;

const PortfolioSummarySection = ({
  language = "javascript",
}: PortfolioSummarySectionProps) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<CodeLanguage>(language);

  return (
    <div className="py-14 lg:pb-32 lg:py-20">
      <Container>
        <div className="flex items-center">
          <div className="text-xs sm:text-base flex flex-col flex-wrap gap-5 min-h-full tracking-normal bg-neutral-800 dark:bg-gray-800 transition-colors px-3 sm:pl-6 sm:pr-8 py-6 rounded-lg shadow-xl mx-auto">
            <div className="flex w-full items-center justify-between gap-4">
              <FauxMenu className="shrink-0" />

              <div
                aria-label="Select code language"
                className="inline-flex h-7 shrink-0 items-center rounded-md bg-neutral-900/70 p-0.5 ring-1 ring-neutral-700/80"
                role="group"
              >
                {LANGUAGE_OPTIONS.map(
                  ({
                    activeClassName,
                    label,
                    language: languageOption,
                    tooltip,
                  }) => {
                    const isActive = selectedLanguage === languageOption;

                    return (
                      <button
                        key={languageOption}
                        aria-pressed={isActive}
                        className={classNames(
                          "min-w-10 cursor-pointer rounded px-2 py-1 text-xs font-semibold leading-none transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-green-400",
                          isActive
                            ? ["ring-1", activeClassName]
                            : "text-neutral-500 hover:text-neutral-200"
                        )}
                        data-tooltip-content={tooltip}
                        data-tooltip-id="guest-tooltip"
                        onClick={() => setSelectedLanguage(languageOption)}
                        type="button"
                      >
                        {label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="leading-loose flex flex-row gap-3 sm:gap-8 relative">
              <code className="flex gap-0.5 flex-col justify-start relative text-gray-50 tracking-wide">
                <PortfolioSummaryCode language={selectedLanguage} />
              </code>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PortfolioSummarySection;
