"use client";
import { Button, Card, Dialog, DialogProps, Scrollbar } from "@/components";
import { DataWithPagination } from "@/utils/pagination";
import { useEffect, useState } from "react";
import { FileAPIDataStructure } from "@/features/files/types";
import GalleryWrapper, {
  GallerySingleProps,
} from "@/app/admin/(modules)/gallery/_components/GalleryWrapper";
import { useGetTermList } from "@/features/terms/api/getTermList";
import { TERM_IDENTIFIER } from "@/data";
import { useGetTaxonomyByTermId } from "@/features/term_taxonomy/api/getTaxonomyByTermId";
import * as UIScrollArea from "@radix-ui/react-scroll-area";
import { useQueryClient } from "@tanstack/react-query";

interface GalleryDialogProps
  extends Omit<DialogProps, "children">,
    Required<Pick<GallerySingleProps, "onSelect">>,
    Omit<GallerySingleProps, "onSelect" | "cols"> {}

const GalleryDialog = ({
  isOpen,
  onClose,
  onSelect,
  activeId,
}: GalleryDialogProps) => {
  const [localSelected, setLocalSelected] =
    useState<FileAPIDataStructure | null>(null);

  const queryClient = useQueryClient();

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
    if (!!localSelected) {
      onSelect(localSelected);
      setLocalSelected(null);
    }
  };

  useEffect(() => {
    if (isOpen && categoryTermTaxonomy?.id) {
      let selectedItem: FileAPIDataStructure | undefined = undefined;

      queryClient
        .getQueryCache()
        .findAll({
          queryKey: [
            "infinite_files",
            { category_id: categoryTermTaxonomy!.id },
          ],
          exact: false,
        })
        ?.forEach((cache) => {
          (queryClient.getQueryData(cache.queryKey) as any)?.pages.forEach(
            ({ data }: DataWithPagination<FileAPIDataStructure>) => {
              selectedItem = data.find((item) => item.id === activeId);

              if (!!selectedItem) {
                setLocalSelected(selectedItem);
                return;
              }
            }
          );
        });
    }
  }, [isOpen, categoryTermTaxonomy]);

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
                cols={8}
                per_page={16}
                activeId={localSelected?.id}
                categoryId={categoryTermTaxonomy?.id}
                onSelect={setLocalSelected}
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
              setLocalSelected(null);
            }}
          >
            Cancel
          </Button>

          <Button size="small" rounded onClick={onSelectHandler}>
            Select Image
          </Button>
        </Card.Footer>
      </Card>
    </Dialog>
  );
};

export default GalleryDialog;
