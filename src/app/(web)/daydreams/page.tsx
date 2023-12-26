import Container from "@/app/(web)/_components/Container";
import { GalleryProvider } from "@/context/GalleryContext";
import { DaydreamList } from "@/app/(web)/daydreams/_components/DaydreamList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Jeam Oro - Daydreams",
};

const DaydreamPage = () => {
  return (
    <Container className="py-20">
      <h1 className="text-xl text-neutral-700 font-bold mb-14 text-left dark:text-neutral-200">
        We are all daydreaming.
      </h1>

      <GalleryProvider>
        <DaydreamList />
      </GalleryProvider>
    </Container>
  );
};

export default DaydreamPage;
