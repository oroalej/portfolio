"use client";
import { Button, Card, Dialog, DialogProps, Scrollbar } from "@/components";
import { useMemo, useState } from "react";
import { FileAPIDataStructure } from "@/features/files/types";
import GalleryWrapper from "@/app/admin/(modules)/gallery/_components/GalleryWrapper";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import * as UIScrollArea from "@radix-ui/react-scroll-area";
import { DaydreamImageFile } from "@/features/daydreams/types";

interface GalleryDialogProps extends Omit<DialogProps, "children"> {
  onSelect: (value: DaydreamImageFile[]) => void | Promise<void>;
  selectedImages: DaydreamImageFile[];
}

const toDaydreamImageFile = (
  file: FileAPIDataStructure
): DaydreamImageFile => ({
  bucket_name: file.bucket_name,
  height: file.height,
  id: file.id,
  name: file.name,
  size: file.size,
  storage_file_path: file.storage_file_path,
  type: file.type,
  width: file.width,
});

const GalleryDialog = ({
  isOpen,
  onClose,
  onSelect,
  selectedImages,
}: GalleryDialogProps) => {
  const [localSelected, setLocalSelected] =
    useState<DaydreamImageFile[]>(selectedImages);
  const selectedIds = useMemo(
    () => localSelected.map((item) => item.id),
    [localSelected]
  );

  const { data: termList } = useGetTermList();
  const termData = termList?.find(
    (item) => item.identifier === TERM_IDENTIFIER.GALLERY_CATEGORIES
  );
  const { data: termTaxonomyList } = useGetTaxonomyByTermId({
    filter: { term_id: termData?.id },
  });
  const categoryTermTaxonomy = termTaxonomyList?.find(
    (item) => item.name === "Daydreams"
  );

  const onSelectHandler = () => {
    if (!!localSelected.length) {
      onSelect(localSelected);
      setLocalSelected([]);
    }
  };

  const onToggleSelectedHandler = (value: FileAPIDataStructure) => {
    setLocalSelected((current) => {
      if (current.some((item) => item.id === value.id)) {
        return current.filter((item) => item.id !== value.id);
      }

      return [...current, toDaydreamImageFile(value)];
    });
  };

  return (
    <Dialog isOpen={isOpen}>
      <Card rounded className="max-w-6xl mx-auto mt-20">
        <Card.Header className="pb-0">
          <Card.Title>Gallery</Card.Title>
        </Card.Header>
        <Card.Body className="flex-1">
          <UIScrollArea.Root type="auto">
            <UIScrollArea.Viewport className="h-96 p-1 pr-4">
              <GalleryWrapper
                multiple
                cols={8}
                per_page={16}
                activeId={selectedIds}
                categoryId={categoryTermTaxonomy?.id}
                onSelect={onToggleSelectedHandler}
              />
            </UIScrollArea.Viewport>
            <Scrollbar />
          </UIScrollArea.Root>
        </Card.Body>
        <Card.Footer className="justify-end pt-0">
          <Button
            size="small"
            color="secondary"
            variant="text"
            rounded
            onClick={() => {
              onClose && onClose();
              setLocalSelected([]);
            }}
          >
            Cancel
          </Button>

          <Button
            size="small"
            rounded
            onClick={onSelectHandler}
            disabled={!localSelected.length}
          >
            Select Images
          </Button>
        </Card.Footer>
      </Card>
    </Dialog>
  );
};

export default GalleryDialog;
