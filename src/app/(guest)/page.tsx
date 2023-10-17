import {Fragment} from "react";
import AboutMeSection from "@/app/(guest)/_components/Sections/AboutMeSection";
import SkillsSection from "@/app/(guest)/_components/Sections/SkillsSection";
import ProjectsSection from "@/app/(guest)/_components/Sections/ProjectsSection";
import PortfolioSummarySection from "@/app/(guest)/_components/Sections/PortfolioSummarySection";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Alexander Jeam Oro"
}

const RootPage = () => {
    return (
        <Fragment>
            <PortfolioSummarySection/>
            <AboutMeSection/>
            <ProjectsSection/>
            <SkillsSection/>

        </Fragment>
    )
}

export default RootPage
