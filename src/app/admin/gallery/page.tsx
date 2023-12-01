import { Metadata } from "next";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Admin - Gallery",
};

const AdminGalleryRootPage = () => (
  <BreadcrumbDataSetter breadcrumbs={[{ content: "Gallery" }]} />
);

export default AdminGalleryRootPage;
