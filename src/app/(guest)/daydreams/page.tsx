import {Container, SectionWrapper} from "@/components";
import {Metadata} from "next";
import DaydreamList from "@/app/(guest)/daydreams/_components/DaydreamList";
import {GalleryProvider} from "@/context/GalleryContext";
import {DaydreamAPIDataStructure} from "@/api/DaydreamAPI";

export const metadata: Metadata = {
    title: "Alexander Jeam Oro - I'm daydreaming"
}

const EchoPage = () => {
    return (
        <Container>
            <SectionWrapper>
                <GalleryProvider<DaydreamAPIDataStructure>>
                    <DaydreamList/>
                </GalleryProvider>
            </SectionWrapper>
        </Container>
    )
}

export default EchoPage;
