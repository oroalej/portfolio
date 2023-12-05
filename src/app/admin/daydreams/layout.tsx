import { Fragment, Suspense } from "react";
import DaydreamTableFilterLoading from "@/app/admin/daydreams/_components/Loading/DaydreamTableFilterLoading";
import DaydreamTableFilters from "@/app/admin/daydreams/_components/DaydreamTableFilters";
import DaydreamTable from "@/app/admin/daydreams/_components/DaydreamTable";
import { BaseComponent } from "@/types";
import DaydreamTableLoading from "@/app/admin/daydreams/_components/Loading/DaydreamTableLoading";

const AdminDaydreamIndexLayout = ({
  children,
}: Pick<BaseComponent, "children">) => (
  <Fragment>
    <Suspense fallback={<DaydreamTableFilterLoading />}>
      <DaydreamTableFilters />
    </Suspense>

    <div className="flex flex-row gap-2 items-start">
      <Suspense fallback={<DaydreamTableLoading />}>
        <DaydreamTable />
      </Suspense>

      {children}
    </div>
  </Fragment>
);

export default AdminDaydreamIndexLayout;
