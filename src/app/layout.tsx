import "@/styles/global.css";
import {ReactNode} from "react";

interface BaseComponent {
    children?: ReactNode;
    className?: string
}

const RootLayout = ({children}: BaseComponent) => {
    return (
        <html lang="en" className="!scroll-smooth">
        <body className="min-h-screen bg-zinc-50 relative">
        {children}
        </body>
        </html>
    )
}

export default RootLayout;
