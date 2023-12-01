import ShowWrapper from "@/app/admin/(modules)/gallery/[imageId]/_components/ShowWrapper";
import { Fragment } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/_components/Breadcrumbs";
import { Metadata } from "next";

interface AdminGalleryItemShowPage {
  params: { imageId: string };
}

export const metadata: Metadata = {
  title: "Admin - Show Image",
};

const AdminGalleryItemShowPage = ({
  params: { imageId },
}: AdminGalleryItemShowPage) => (
  <Fragment>
    <BreadcrumbDataSetter
      breadcrumbs={[
        { href: "/gallery", content: "Gallery" },
        { content: imageId },
      ]}
    />
    <ShowWrapper id={imageId} />
  </Fragment>
);

export default AdminGalleryItemShowPage;
