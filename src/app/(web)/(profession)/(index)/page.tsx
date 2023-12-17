import SkillsSection from "@/app/(web)/(profession)/(index)/_components/Sections/SkillsSection";
import PortfolioSummarySection from "@/app/(web)/(profession)/(index)/_components/Sections/PortfolioSummarySection";
import AboutMeSection from "@/app/(web)/(profession)/_components/AboutMeSection";
import { Fragment } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro",
};

const RootPage = () => (
  <Fragment>
    <PortfolioSummarySection />
    <AboutMeSection />
    <SkillsSection />
  </Fragment>
);

export default RootPage;
