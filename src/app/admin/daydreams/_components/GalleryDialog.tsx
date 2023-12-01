"use client";

import { Button, Card, Dialog, DialogProps, Scrollbar } from "@/components";
import classNames from "classnames";
import { useFileList } from "@/features/files/api/getFileList";
import { DEFAULT_PAGINATION_VALUES } from "@/utils/pagination";
import { useState } from "react";
import { FileAPIDataStructure } from "@/features/files/types";
import SupabaseImage from "@/app/admin/daydreams/_components/SupabaseImage";
import * as UIScrollArea from "@radix-ui/react-scroll-area";

interface GalleryDialogProps extends DialogProps {
  onSelect: (value: FileAPIDataStructure) => void;
  selected: FileAPIDataStructure | null;
}

const GalleryDialog = ({
  isOpen,
  onClose,
  onSelect,
  selected,
}: GalleryDialogProps) => {
  const [page, setPage] = useState(DEFAULT_PAGINATION_VALUES.current_page);
  const [localSelected, setLocalSelected] =
    useState<FileAPIDataStructure | null>(null);

  const { isLoading, data } = useFileList({
    bucket_name: "images",
    per_page: DEFAULT_PAGINATION_VALUES.per_page,
    page,
  });

  const onSelectHandler = () => {
    if (localSelected !== null) {
      onSelect(localSelected);
      setLocalSelected(null);
    }
  };

  const selectedId = localSelected?.id ?? selected?.id;

  return (
    <Dialog isOpen={isOpen}>
      <Card rounded className="max-w-6xl mx-auto mt-20">
        <Card.Header className="pb-0">
          <Card.Title>Gallery</Card.Title>
        </Card.Header>
        <Card.Body className="flex-1">
          <UIScrollArea.Root type="auto">
            <UIScrollArea.Viewport className="max-h-96 p-1 pr-3.5">
              <div className="grid grid-cols-8 gap-2.5">
                {data?.data.map((item, index) => (
                  <div
                    className={classNames(
                      [
                        selectedId === item.id
                          ? "ring-blue-700"
                          : "ring-transparent",
                      ],
                      "relative overflow-hidden bg-neutral-100 hover:bg-neutral-200 transition-colors aspect-square rounded-md cursor-pointer ring-2 ring-offset-2"
                    )}
                    key={`gallery-image-${item.id}-${index}`}
                    onClick={() => setLocalSelected(item)}
                  >
                    <SupabaseImage
                      src={item.storage_file_path}
                      alt={item.name}
                      width={480}
                      height={480}
                      quality={75}
                      className="rounded-md pointer-events-none object-center object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
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
