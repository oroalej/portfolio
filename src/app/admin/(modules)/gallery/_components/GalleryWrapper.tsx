import GalleryCategorySelect from "@/app/admin/(modules)/gallery/_components/GalleryCategorySelect";
import classNames from "classnames";
import SupabaseImage from "@/components/Image/SupabaseImage";
import {
  DataWithPagination,
  DEFAULT_PAGINATION_VALUES,
} from "@/utils/pagination";
import {
  ElementType,
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
import { removeEmptyValues } from "@/utils";

interface ChildrenProps {
  item: FileAPIDataStructure;
  isSelected: boolean;
}

export interface BaseGallery {
  cols: number;
  onSelect?: (value: FileAPIDataStructure) => void;
  gap?: string;
  per_page?: number;
  excluded?: string[];
  isSearchable?: string;
  isCategoryFilterVisible?: boolean;
  categoryId?: string | null;
}

type ChildGallery =
  | {
      children: never;
      childLoadingIndicator: never;
    }
  | {
      children: ({ item, isSelected }: ChildrenProps) => ReactNode;
      childLoadingIndicator: ElementType;
    };

type Gallery = ChildGallery & BaseGallery;

type GalleryMultiProps = {
  multiple: true;
  activeId?: string[];
} & Gallery;

type GallerySingleProps = {
  multiple?: false;
  activeId?: string;
} & Gallery;

export type GalleryWrapperProps = GalleryMultiProps | GallerySingleProps;

const tabs = [
  {
    value: 0,
    text: "Images",
  },
  {
    value: 1,
    text: "Bookmarks",
  },
];

const GalleryWrapper = ({
  children,
  activeId,
  onSelect,
  isCategoryFilterVisible,
  cols = 1,
  gap = "12px",
  excluded = [],
  per_page = DEFAULT_PAGINATION_VALUES.per_page,
  categoryId: categoryIdProp = null,
  childLoadingIndicator: ChildLoadingIndicator,
}: GalleryWrapperProps) => {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [tab, setTab] = useState<number>(0);
  const [localCategoryId, setLocalCategoryId] = useState<string | null>(
    categoryIdProp
  );

  const [query, setQuery] = useQueryState("q", {
    history: "push",
  });

  const [categoryId, setCategoryId] = useQueryState("category_id", {
    history: "push",
    defaultValue: categoryIdProp ?? "",
  });

  const {
    data: imageData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteFileList({
    bucket_name: "images",
    per_page: per_page,
    page: DEFAULT_PAGINATION_VALUES.current_page,
    q: query ?? undefined,
    filter: removeEmptyValues({
      category_id: categoryId,
      is_bookmarked: Boolean(Number(tab)) || undefined,
    }),
  });

  useEffect(() => {
    setLocalCategoryId((categoryId || categoryIdProp) ?? null);

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

  const LoadingIndicator = () => {
    if (ChildLoadingIndicator) return <ChildLoadingIndicator />;

    return (
      <div className="bg-neutral-100 p-2.5 rounded-md transition-colors w-full aspect-square" />
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 items-center">
          {tabs.map((item) => {
            const id = `inputRadio${item.text}`;

            return (
              <div key={id}>
                <input
                  type="radio"
                  name="tab"
                  className="peer hidden"
                  id={id}
                  onChange={() => setTab(item.value)}
                  checked={item.value === tab}
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer peer-checked:bg-neutral-200 text-sm text-neutral-700 font-medium px-3 py-1.5 hover:bg-neutral-200 rounded-md transition-colors"
                >
                  {item.text}
                </label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {isCategoryFilterVisible && (
            <GalleryCategorySelect
              value={localCategoryId}
              onChange={setLocalCategoryId}
              placeholder="Categories"
              defaultValue={null}
              onClear={onGalleryCategoryClearHandler}
              inputFieldClass="min-w-[14rem]"
            />
          )}

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
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap,
        }}
      >
        {isLoading ? (
          [...Array(2)].map((_, index) => (
            <LoadingIndicator key={`item-${index}`} />
          ))
        ) : !!imageData?.pages.length &&
          !!(imageData.pages[0] as DataWithPagination<FileAPIDataStructure>)
            .pagination.total ? (
          imageData.pages.map((page) =>
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
                      onSelect &&
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
        <div className="flex flex-row items-center justify-center mt-2">
          <button
            onClick={async () => await fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-neutral-100 hover:bg-neutral-200/70 px-2.5 py-2 w-44 rounded-md transition-all flex items-center justify-center cursor-pointer active:bg-neutral-200/80 h-full"
          >
            <span className="text-neutral-700 font-medium text-sm">
              Load more
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
export default GalleryWrapper;
