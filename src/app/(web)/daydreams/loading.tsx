import Container from "@/app/(web)/_components/Container";
import { DaydreamListLoading } from "@/app/(web)/daydreams/_components/DaydreamList";

const DaydreamLoadingPage = () => (
  <Container className="py-20">
    <h1 className="text-xl text-neutral-700 font-bold mb-14 text-left dark:text-neutral-200">
      We are all daydreaming.
    </h1>

    <DaydreamListLoading />
  </Container>
);

export default DaydreamLoadingPage;
