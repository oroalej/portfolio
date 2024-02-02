import { Fragment, Suspense } from "react";
import { BaseComponent } from "@/types";
import { CardHeader, CardRoot, CardTitle } from "@/components";
import { FaRegImages } from "react-icons/fa6";
import {
  GalleryList,
  GalleryListLoading,
} from "@/app/admin/(modules)/gallery/_components/GalleryList";
import UploadImageButton from "@/app/admin/(modules)/gallery/_components/UploadImageButton";

const AdminGalleryIndexLayout = ({
  children,
}: Pick<BaseComponent, "children">) => (
  <Fragment>
    <CardRoot rounded className="mb-2">
      <CardHeader className="flex justify-between">
        <CardTitle icon={<FaRegImages />}>Gallery</CardTitle>

        <UploadImageButton />
      </CardHeader>
    </CardRoot>

    <div className="flex flex-row gap-2">
      <Suspense fallback={<GalleryListLoading cols={5} />}>
        <GalleryList />
      </Suspense>

      {children}
    </div>
  </Fragment>
);
export default AdminGalleryIndexLayout;
