import {Fragment} from "react";
import {BaseComponent} from "@/types";
import TheHeader from "@/app/admin/_components/Layout/TheHeader";

const AdminLayout = ({children}: Pick<BaseComponent, 'children'>) => {
    return (
        <Fragment>
            <TheHeader/>
            <main className="bg-neutral-100 rounded-lg dark:bg-slate-800 font-mono sm:mt-[93px] xs:p-2.5 min-h-screen">
                {children}
            </main>
        </Fragment>
    )
}

export default AdminLayout;

