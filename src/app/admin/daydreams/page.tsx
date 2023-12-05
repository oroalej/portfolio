import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - All Daydreams",
};

const AdminDaydreamIndexPage = () => (
  <BreadcrumbDataSetter breadcrumbs={[{ content: "All Dreams" }]} />
);

export default AdminDaydreamIndexPage;
