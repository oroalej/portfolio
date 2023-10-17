import {Metadata} from "next";
import {Button} from "@/components";
import QuotesTable from "@/app/admin/quotes/_components/QuotesTable";
import {Suspense} from "react";
import AdminQuoteListPage from "@/app/admin/quotes/(Index)/loading";
import TableFilter from "@/app/admin/quotes/_components/TableFilter";

export const metadata: Metadata = {
    title: "Admin - Quotes"
}

const AdminQuotePage = () => (
    <Suspense fallback={<AdminQuoteListPage/>}>
        <div className="max-w-screen-2xl mx-auto py-14">
            <div className="flex justify-end mb-4">
                <Button href="/admin/quotes/create">
                    Add Quote
                </Button>
            </div>

            <div className="flex flex-row gap-8 items-start">
                <TableFilter/>
                <QuotesTable/>
            </div>
        </div>
    </Suspense>

)

export default AdminQuotePage;
