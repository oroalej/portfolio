import {Container, SectionWrapper} from "@/components";
import {Metadata} from "next";
import DaydreamList from "@/app/(guest)/daydreams/_components/DaydreamList";

export const metadata: Metadata = {
    title: "Alexander Jeam Oro - I'm daydreaming"
}

const EchoPage = () => {
    return (
        <Container>
            <SectionWrapper>
                <div className="grid gap-4 grid-cols-2">
                    <DaydreamList />
                </div>
            </SectionWrapper>
        </Container>
    )
}

export default EchoPage;
