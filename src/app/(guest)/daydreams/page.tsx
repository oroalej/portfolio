import { Metadata } from "next";
import DaydreamList from "@/app/(guest)/daydreams/_components/DaydreamList";
import { GalleryProvider } from "@/context/GalleryContext";
import { DaydreamAPIDataStructure } from "@/features/daydreams/types";
import { Container } from "@/components";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - I'm daydreaming",
};

const EchoPage = () => {
  return (
    <div className="py-14 dark:text-neutral-300">
      <Container>
        <h1 className="text-xl text-neutral-700 font-bold mb-14 text-left dark:text-neutral-200">
          We are all daydreaming.
        </h1>

        <GalleryProvider<DaydreamAPIDataStructure>>
          <DaydreamList />
        </GalleryProvider>
      </Container>
    </div>
  );
};

export default EchoPage;
