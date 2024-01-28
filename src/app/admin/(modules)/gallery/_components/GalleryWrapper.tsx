import GalleryCategorySelect from "@/app/admin/(modules)/gallery/_components/GalleryCategorySelect";
import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";
import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
} from "@/utils/pagination";
import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BaseSkeletonLoader, Button } from "@/components";
import { FileAPIDataStructure } from "@/features/files/types";
import { useInfiniteFileList } from "@/features/files/api/getInfiniteFileList";
import { InputField } from "@/components/Form/InputField";
import { useQueryState } from "next-usequerystate";

interface ChildrenProps {
  item: FileAPIDataStructure;
  isSelected: boolean;
}

interface BaseGallery {
  cols: number;
  onSelect: (value: FileAPIDataStructure) => void;
  gap?: string;
  per_page?: number;
  excluded?: string[];
  isSearchable?: string;
  children?: ({ item, isSelected }: ChildrenProps) => ReactNode;
}

interface GalleryMultiProps extends BaseGallery {
  multiple: true;
  activeId?: string[];
}

interface GallerySingleProps extends BaseGallery {
  multiple?: false;
  activeId?: string;
}

export type GalleryWrapperProps = GalleryMultiProps | GallerySingleProps;

const GalleryWrapper = ({
  children,
  activeId,
  onSelect,
  cols = 1,
  gap = "12px",
  excluded = [],
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
}: GalleryWrapperProps) => {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [localCategoryId, setLocalCategoryId] = useState<string | null>(null);

  const [query, setQuery] = useQueryState("q", {
    history: "push",
  });

  const [categoryId, setCategoryId] = useQueryState("category_id", {
    history: "push",
  });

  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteFileList({
    bucket_name: "images",
    per_page: per_page,
    page: DEFAULT_PAGINATION_VALUES.current_page,
    q: query ?? undefined,
    filter: { category_id: categoryId },
  });

  useEffect(() => {
    setLocalCategoryId(categoryId);

    if (queryRef.current) {
      queryRef.current.value = query || "";
    }
  }, []);

  const onSearchHandler = () => {
    if (queryRef.current) {
      setQuery(queryRef.current?.value.toLowerCase() ?? "").catch();
    }

    setCategoryId(localCategoryId).catch();
  };

  const getActiveIds = Array.isArray(activeId) ? activeId : [activeId];
  const filteredActiveIdsFromExcluded = useMemo(
    () => excluded?.filter((id) => !getActiveIds.includes(id)),
    [excluded, activeId]
  );

  const onGalleryCategoryClearHandler = useCallback(
    () => setLocalCategoryId(null),
    []
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="w-full flex flex-row justify-end gap-2 items-center">
        <GalleryCategorySelect
          value={localCategoryId}
          onChange={setLocalCategoryId}
          placeholder="Categories"
          defaultValue={null}
          onClear={onGalleryCategoryClearHandler}
        />

        <InputField
          placeholder="Search by filename"
          className="w-56"
          small
          ref={queryRef}
          onKeyPress={(event) => {
            if (event.key === "Enter") onSearchHandler();
          }}
        />
        <Button rounded type="button" size="small" onClick={onSearchHandler}>
          Search
        </Button>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap,
        }}
      >
        {!!infiniteData?.pages.length &&
        !!(infiniteData.pages[0] as DataWithPagination<FileAPIDataStructure>)
          .pagination.total ? (
          infiniteData.pages.map((page) =>
            (page as DataWithPagination<FileAPIDataStructure>).data
              // .filter((item) => !filteredActiveIdsFromExcluded.includes(item.id))
              .map((item, index) =>
                children ? (
                  children({
                    item,
                    isSelected: filteredActiveIdsFromExcluded.includes(item.id),
                  })
                ) : (
                  <div
                    className={classNames(
                      [
                        getActiveIds.includes(item.id)
                          ? "ring-blue-700"
                          : "ring-transparent",
                      ],
                      [
                        filteredActiveIdsFromExcluded.includes(item.id)
                          ? "pointer-events-none"
                          : "cursor-pointer",
                      ],
                      "relative overflow-hidden bg-neutral-100 hover:bg-neutral-200 transition-colors aspect-square rounded-md ring-2 ring-offset-2"
                    )}
                    key={`gallery-image-${item.id}-${index}`}
                    onClick={() =>
                      !filteredActiveIdsFromExcluded.includes(item.id) &&
                      onSelect(item)
                    }
                  >
                    {filteredActiveIdsFromExcluded.includes(item.id) && (
                      <span className="absolute inset-0 bg-neutral-800 bg-opacity-40" />
                    )}

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
                )
              )
          )
        ) : (
          <div
            className="text-center py-6"
            style={{ gridColumn: `span ${cols}` }}
          >
            No result
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button
            size="small"
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
