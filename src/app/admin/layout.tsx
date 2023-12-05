import { BaseComponent } from "@/types";
import { AuthProvider } from "@/context/SupabaseContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryClientProvider from "@/context/ReactQueryContext";
import "@/styles/global.css";

const AdminLayout = ({ children }: Pick<BaseComponent, "children">) => (
  <html lang="en" className="!scroll-smooth">
    <body className="min-h-screen bg-zinc-50 relative">
      <ReactQueryClientProvider>
        <AuthProvider>{children}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryClientProvider>
    </body>
  </html>
);

export default AdminLayout;
