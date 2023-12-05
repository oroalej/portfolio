import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
} from "@/utils/pagination";
import { Suspense, useMemo } from "react";
import { BaseSkeletonLoader, Button } from "@/components";
import { FileAPIDataStructure } from "@/features/files/types";
import { useInfiniteFileList } from "@/features/files/api/getInfiniteFileList";
import classNames from "classnames";
import SupabaseImage from "@/app/admin/(modules)/daydreams/_components/SupabaseImage";

interface BaseGallery {
  gap: string;
  cols: number;
  per_page: number;
  onSelect: (value: FileAPIDataStructure) => void;
  excluded?: string[];
}

interface GalleryMultiProps extends BaseGallery {
  multiple: true;
  activeId?: string[];
}

interface GallerySingleProps extends BaseGallery {
  multiple?: false;
  activeId?: string;
}

type GalleryWrapper = GalleryMultiProps | GallerySingleProps;

const GalleryWrapper = ({
  activeId,
  onSelect,
  cols = 1,
  gap = "12px",
  excluded = [],
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
}: GalleryWrapper) => {
  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteFileList({
    page: DEFAULT_PAGINATION_VALUES.current_page,
    bucket_name: "images",
    per_page: per_page,
  });

  const filteredActiveIdsFromExcluded = useMemo(() => {
    if (Array.isArray(activeId)) {
      return excluded?.filter((id) => !activeId.includes(id));
    }

    return excluded?.filter((id) => id !== activeId);
  }, [excluded, activeId]);

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {infiniteData?.pages.map((page) =>
        (page as DataWithPagination<FileAPIDataStructure>).data
          .filter((item) => !filteredActiveIdsFromExcluded.includes(item.id))
          .map((item, index) => (
            <div
              className={classNames(
                [
                  (
                    Array.isArray(activeId)
                      ? activeId.includes(item.id)
                      : activeId === item.id
                  )
                    ? "ring-blue-700"
                    : "ring-transparent",
                ],
                "relative overflow-hidden bg-neutral-100 hover:bg-neutral-200 transition-colors aspect-square rounded-md cursor-pointer ring-2 ring-offset-2"
              )}
              key={`gallery-image-${item.id}-${index}`}
              onClick={() => onSelect(item)}
            >
              <Suspense
                fallback={
                  <BaseSkeletonLoader className="rounded-md aspect-square" />
                }
              >
                <SupabaseImage
                  src={item.storage_file_path}
                  alt={item.name}
                  width={480}
                  height={480}
                  quality={75}
                  className="rounded-md pointer-events-none object-center object-cover w-full h-full"
                />
              </Suspense>
            </div>
          ))
      )}

      {hasNextPage && (
        <div
          className="text-center mt-4"
          style={{ gridColumn: `span ${cols}` }}
        >
          <Button
            size="extra-small"
            color="secondary"
            rounded
            type="button"
            isLoading={isFetchingNextPage}
            onClick={async () => await fetchNextPage()}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default GalleryWrapper;
