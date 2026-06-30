import ShowWrapper from "@/app/admin/(modules)/gallery/[imageId]/_components/ShowWrapper";
import { Fragment } from "react";
import { BreadcrumbDataSetter } from "@/app/admin/(modules)/_components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Show Image",
};

const AdminGalleryItemShowPage = async ({
  params,
}: PageProps<"/admin/gallery/[imageId]">) => {
  const { imageId } = await params;

  return (
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
};

export default AdminGalleryItemShowPage;
