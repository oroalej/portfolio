import { Fragment, Suspense } from "react";
import QuoteTableFilter from "@/app/admin/quotes/_components/QuoteTableFilter";
import QuotesTable from "@/app/admin/quotes/_components/QuotesTable";
import QuoteTableLoading from "@/app/admin/quotes/_components/Loading/QuoteTableLoading";
import QuoteTableFilterLoading from "@/app/admin/quotes/_components/Loading/QuoteTableFilterLoading";
import { BaseComponent } from "@/types";

const AdminQuoteIndexLayout = ({
  children,
}: Pick<BaseComponent, "children">) => (
  <Fragment>
    <Suspense fallback={<QuoteTableFilterLoading />}>
      <QuoteTableFilter />
    </Suspense>

    <div className="flex flex-row gap-2 items-start">
      <Suspense fallback={<QuoteTableLoading />}>
        <QuotesTable />
      </Suspense>

      {children}
    </div>
  </Fragment>
);

export default AdminQuoteIndexLayout;
