import {Fragment} from "react";
import AboutMeSection from "@/app/(guest)/_components/Sections/AboutMeSection";
import SkillsSection from "@/app/(guest)/_components/Sections/SkillsSection";
import ProjectsSection from "@/app/(guest)/_components/Sections/ProjectsSection";
import PortfolioSummarySection from "@/app/(guest)/_components/Sections/PortfolioSummarySection";
import {Toaster} from 'react-hot-toast';
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

            <Toaster position="top-right" gutter={8} containerClassName="text-sm"/>
        </Fragment>
    )
}

export default RootPage