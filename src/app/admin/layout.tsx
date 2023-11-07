import {BaseComponent} from "@/types";
import TheHeader from "@/app/admin/_components/Layout/TheHeader";
import {AuthProvider} from "@/context/SupabaseContext";
import {Toaster} from "react-hot-toast";
import {Tooltip} from "@/components";
import ReactQueryClientProvider from "@/context/ReactQueryContext";

const AdminLayout = ({children}: Pick<BaseComponent, 'children'>) => {
    return (
        <ReactQueryClientProvider>
            <AuthProvider>
                <TheHeader/>
                <main
                    className="bg-neutral-50 rounded-lg dark:bg-slate-800 font-mono sm:mt-[93px] xs:p-2.5 min-h-screen">
                    {children}
                </main>

                <Toaster position="top-right" gutter={8} containerClassName="text-sm text-left"/>
                <Tooltip id="admin-tooltip"/>
            </AuthProvider>
        </ReactQueryClientProvider>
    )
}

export default AdminLayout;

