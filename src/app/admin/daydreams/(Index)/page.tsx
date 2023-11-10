import Link from "next/link";
import { Metadata } from "next";
import DaydreamTable from "@/app/admin/daydreams/(Index)/_components/DaydreamTable";
import { Suspense } from "react";
import AdminDaydreamListLoading from "@/app/admin/daydreams/(Index)/loading";

export const metadata: Metadata = {
  title: "Admin - Daydreams List",
};

const DaydreamPage = () => (
  <Suspense fallback={<AdminDaydreamListLoading />}>
    <div className="max-w-screen-xl mx-auto">
      <div className="py-14">
        <div className="flex justify-end mb-4">
          <Link
            href={"/admin/daydreams/create"}
            type="submit"
            className="text-neutral-200 bg-neutral-800 px-4 py-2 hover:bg-opacity-90 transition-colors active:bg-opacity-100 cursor-pointer disabled:cursor-default disabled:bg-opacity-75"
          >
            Add Dream
          </Link>
        </div>

        <DaydreamTable />
      </div>
    </div>
  </Suspense>
);

export default DaydreamPage;
