import {SectionContent, SectionTitle, SectionWrapper} from "./Section";

const Section = SectionWrapper as typeof SectionWrapper & {
    Title: typeof SectionTitle;
    Content: typeof SectionContent
};

Section.Title = SectionTitle;
Section.Content = SectionContent;

export {
    Section,
    SectionWrapper,
    SectionTitle,
    SectionContent
};
