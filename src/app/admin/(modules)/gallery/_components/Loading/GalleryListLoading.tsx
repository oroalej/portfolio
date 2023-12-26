import { CardBody, CardRoot } from "@/components";
import GalleryItemLoading from "@/app/admin/(modules)/gallery/_components/Loading/GalleryItemLoading";

const GalleryListLoading = () => (
  <CardRoot rounded className="flex-1">
    <CardBody className="flex flex-row gap-3">
      {[...Array(2)].map((_, index) => (
        <GalleryItemLoading key={`gallery-image-loading-${index}`} />
      ))}
    </CardBody>
  </CardRoot>
);

export default GalleryListLoading;
