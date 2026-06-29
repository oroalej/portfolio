import "@/styles/global.css";
import { ReactNode, Suspense } from "react";
import ReactQueryClientProvider from "@/context/ReactQueryContext";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface BaseComponent {
  children?: ReactNode;
  className?: string;
}

const RootLayout = ({ children }: Pick<BaseComponent, "children">) => {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className="min-h-screen bg-white relative">
        <NuqsAdapter>
          <ReactQueryClientProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </ReactQueryClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
