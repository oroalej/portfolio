import { EditDataManagementWrapper } from "@/app/admin/(modules)/data-management/_components/EditDataManagementWrarpper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Data Management",
};

interface DataManagementEditPage {
  params: { taxonomyId: string };
}

const DataManagementEditPage = ({
  params: { taxonomyId },
}: DataManagementEditPage) => {
  return <EditDataManagementWrapper taxonomyId={taxonomyId} />;
};

export default DataManagementEditPage;
