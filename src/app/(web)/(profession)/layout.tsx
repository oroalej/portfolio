import { BaseComponent } from "@/types";
import TheHeader from "@/app/(web)/(profession)/_components/TheHeader";
import TheFooter from "@/app/(web)/(profession)/_components/TheFooter";
import ContactMeSection from "@/app/(web)/(profession)/(index)/_components/Sections/ContactMeSection";

const ProfessionalLayout = ({ children }: Omit<BaseComponent, "className">) => (
  <div className="p-3.5 flex flex-col h-full font-mono">
    <span className="fixed inset-x-0 top-0 h-3.5 bg-white z-[1]" />
    <span className="fixed inset-x-0 bottom-0 h-3.5 bg-white z-[1]" />
    <span className="fixed inset-y-0 left-0 w-3.5 bg-white z-[1]" />
    <span className="fixed inset-y-0 right-0 w-3.5 bg-white z-[1]" />

    <div className="rounded-md bg-zinc-50">
      <TheHeader />

      {children}

      <ContactMeSection />
      <TheFooter />
    </div>
  </div>
);

export default ProfessionalLayout;
