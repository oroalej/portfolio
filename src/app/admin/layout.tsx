import { BaseComponent } from "@/types";
import { AuthProvider } from "@/context/SupabaseContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "@/components";

const AdminLayout = ({ children }: Pick<BaseComponent, "children">) => (
  <AuthProvider>
    {children}

    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster
      position="top-right"
      gutter={8}
      containerClassName="text-sm text-left"
    />
    <Tooltip id="admin-tooltip" />
  </AuthProvider>
);

export default AdminLayout;
