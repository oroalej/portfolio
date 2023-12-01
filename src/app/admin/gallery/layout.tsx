import { Fragment, Suspense } from "react";
import { BaseComponent } from "@/types";
import { Button, CardHeader, CardRoot, CardTitle } from "@/components";
import { FaRegImages } from "react-icons/fa6";
import GalleryList from "@/app/admin/gallery/_components/GalleryList";
import GalleryListLoading from "./_components/Loading/GalleryListLoading";

const AdminGalleryIndexLayout = ({
  children,
}: Pick<BaseComponent, "children">) => (
  <Fragment>
    <CardRoot rounded className="mb-2">
      <CardHeader className="flex justify-between">
        <CardTitle icon={<FaRegImages />}>Gallery</CardTitle>

        <Button size="small" rounded href="/admin/gallery/create">
          Upload Image
        </Button>
      </CardHeader>
    </CardRoot>

    <div className="flex flex-row gap-2">
      <Suspense fallback={<GalleryListLoading />}>
        <GalleryList />
      </Suspense>

      {children}
    </div>
  </Fragment>
);
export default AdminGalleryIndexLayout;