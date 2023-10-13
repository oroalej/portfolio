import ContactMeSection from "@/app/(guest)/_components/Sections/ContactMeSection";
import ScrollTopButton from "@/app/(guest)/_components/ScrollTopButton";
import TheHeader from "@/app/(guest)/_components/Layout/TheHeader";
import TheFooter from "@/app/(guest)/_components/Layout/TheFooter";

import {Fragment} from "react";
import {BaseComponent} from "@/types";

const GuestLayout = ({children}: Pick<BaseComponent, 'children'>) => {
    return (
        <Fragment>
            <TheHeader/>

            <main className="bg-neutral-100 rounded-lg dark:bg-neutral-900 font-mono sm:mt-[93px] xs:p-2.5">
                <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 top-0 h-2.5`}/>
                <div className={`hidden xs:block fixed w-full z-50 dark:bg-slate-800 bg-neutral-100 bottom-0 h-2.5`}/>
                <div
                    className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 left-0 top-0 w-2.5`}/>
                <div
                    className={`hidden xs:block fixed h-full z-50 dark:bg-slate-800 bg-neutral-100 right-0 top-0 w-2.5`}/>

                <div className="min-h-screen">
                    {children}
                </div>

                <ContactMeSection/>
                <TheFooter/>
                <ScrollTopButton/>
            </main>
        </Fragment>
    )
}

export default GuestLayout;
