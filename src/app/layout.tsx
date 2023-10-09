import "@/styles/global.css";
import {ReactNode} from "react";
import {TheHeader, TheFooter} from "@/components";
import ContactMeSection from "@/app/_components/ContactMeSection";
import ScrollProgress from "@/app/_components/ScrollProgress";
import ScrollTopButton from "@/app/_components/ScrollTopButton";

interface BaseComponent {
    children?: ReactNode;
    className?: string
}

const RootLayout = ({children}: BaseComponent) => {
    return (
        <html lang="en" className="!scroll-smooth">
        <body
            className="min-h-screen bg-zinc-50 relative"
        >
        <TheHeader/>

        <main className="bg-neutral-100 rounded-lg dark:bg-slate-800 font-mono sm:mt-[93px] xs:p-2.5">
            <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 top-0 h-2.5`}/>
            <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 bottom-0 h-2.5`}/>
            <div className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 left-0 top-0 w-2.5`}/>
            <div className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 right-0 top-0 w-2.5`}/>
            <ScrollProgress />

            <div className="min-h-screen">
                {children}
            </div>

            <ContactMeSection/>
            <TheFooter/>
            <ScrollTopButton/>
        </main>
        </body>
        </html>
    )
}

export default RootLayout;
