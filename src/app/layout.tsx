import "@/styles/global.css";
import { ReactNode } from "react";
import ReactQueryClientProvider from "@/context/ReactQueryContext";

interface BaseComponent {
  children?: ReactNode;
  className?: string;
}

const RootLayout = ({ children }: Pick<BaseComponent, "children">) => {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className="min-h-screen bg-white relative">
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
