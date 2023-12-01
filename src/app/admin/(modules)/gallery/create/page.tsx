import { Fragment } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import GalleryCreateWrapper from "@/app/admin/(modules)/gallery/create/_components/GalleryCreateWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Upload Image",
};

const AdminGalleryCreatePage = () => (
  <Fragment>
    <BreadcrumbDataSetter
      breadcrumbs={[
        { href: "/gallery", content: "Gallery" },
        { content: "Create" },
      ]}
    />

    <GalleryCreateWrapper />
  </Fragment>
);

export default AdminGalleryCreatePage;
