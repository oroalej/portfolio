import { BaseComponent } from "@/types";
import { GalleryProvider } from "@/context/GalleryContext";
import Container from "@/app/(web)/_components/Container";
import ProjectHeader from "@/app/(web)/(profession)/projects/_components/ProjectHeader";

const ProjectLayout = ({ children }: Omit<BaseComponent, "className">) => (
  <Container className="py-20">
    <ProjectHeader />

    <GalleryProvider>
      <div className="flex flex-col gap-6">{children}</div>
    </GalleryProvider>
  </Container>
);

export default ProjectLayout;
