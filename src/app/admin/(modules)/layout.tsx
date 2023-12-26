import { BaseComponent } from "@/types";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import Sidebar from "@/app/admin/(modules)/_components/Sidebar/Sidebar";
import Header from "@/app/admin/(modules)/_components/Header";

const AdminLayout = ({ children }: Pick<BaseComponent, "children">) => (
  <BreadcrumbProvider>
    <div className="flex flex-row">
      <Sidebar />

      <main className="bg-gray-200/70 font-sans flex-1 flex pr-4 pb-4 flex-col pl-[17.5rem]">
        <Header />

        <div className="flex-1" style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </div>
      </main>
    </div>
  </BreadcrumbProvider>
);

export default AdminLayout;
