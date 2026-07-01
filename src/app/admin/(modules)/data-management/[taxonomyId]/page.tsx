import { EditDataManagementWrapper } from "@/app/admin/(modules)/data-management/_components/EditDataManagementWrarpper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Data Management",
};

const DataManagementEditPage = async ({
  params,
}: PageProps<"/admin/data-management/[taxonomyId]">) => {
  const { taxonomyId } = await params;

  return <EditDataManagementWrapper taxonomyId={taxonomyId} />;
};

export default DataManagementEditPage;
