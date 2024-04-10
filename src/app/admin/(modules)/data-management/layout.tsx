import { DataManagementHeader } from "@/app/admin/(modules)/data-management/_components/DataManagementHeader";
import { DataManagementTable } from "@/app/admin/(modules)/data-management/_components/DataManagementTable";
import { BaseComponent } from "@/types";
import { CardRoot } from "@/components";

const DataManagementIndexLayout = ({
  children,
}: Pick<BaseComponent, "children">) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <DataManagementHeader />

      <div className="flex flex-row gap-4 items-start">
        <DataManagementTable />

        {children}
      </div>
    </div>
  );
};

export default DataManagementIndexLayout;
