import { BaseComponent } from "@/types";
import { GalleryProvider } from "@/context/GalleryContext";
import Container from "@/app/(web)/_components/Container";
import { ProjectNavigation } from "@/app/(web)/projects/[projectTypeId]/_components/ProjectNavigation";

const ProjectLayout = ({ children }: Omit<BaseComponent, "className">) => (
  <Container className="py-20">
    <ProjectNavigation />

    <GalleryProvider>
      <div className="flex flex-col gap-6 w-full">{children}</div>
    </GalleryProvider>
  </Container>
);

export default ProjectLayout;
