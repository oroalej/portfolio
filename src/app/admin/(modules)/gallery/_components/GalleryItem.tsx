"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import classNames from "classnames";
import ExpandImagePreviewPlaceholder from "@/components/Image/ExpandImagePreviewPlaceholder";
import ImagePreviewDialog from "@/components/Image/ImagePreviewDialog";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FileAPIDataStructure } from "@/features/files/types";
import {
  useDeleteFileMutation,
  useStoragePublicUrl,
} from "@/features/files/api";
import {
  AlertDialog,
  BaseSkeletonLoader,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
  ImageSkeletonLoader,
} from "@/components";
import { Fragment, Suspense, useCallback, useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { PiTrash } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { BiSolidImageAlt } from "react-icons/bi";
import { getFileBlob } from "@/features/files/api/downloadFile";
import { downloadFile } from "@/utils";
import { useUpdateFileMutation } from "@/features/files/api/updateFile";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { RenameDialog } from "@/app/admin/(modules)/gallery/_components/RenameDialog";
import { UseGalleryQueryParams } from "@/app/admin/(modules)/gallery/hooks/useGalleryQueryParams";

interface GalleryItem {
  item: FileAPIDataStructure;
  isSelected: boolean;
}

const GalleryItem = ({ item, isSelected }: GalleryItem) => {
  const serialized = UseGalleryQueryParams();
  const publicImageUrl = useStoragePublicUrl(item.storage_file_path);
  const router = useRouter();
  const params = useParams();

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  const deleteFileMutation = useDeleteFileMutation();
  const updateFileMutation = useUpdateFileMutation();

  const onDownloadHandler = async () => {
    const { data } = await getFileBlob({
      bucket_name: item.bucket_name,
      pathname: item.storage_file_path,
    });

    if (data) {
      downloadFile(data, item.name);

      toast.success(`${item.name} downloaded!`);
    }
  };

  const onCopyLinkHandler = async () => {
    if (!publicImageUrl.data) return;

    await navigator.clipboard.writeText(publicImageUrl.data);
    toast.success("Link copied!");
  };

  const onDeleteHandler = useCallback(async () => {
    await toast.promise(
      deleteFileMutation.mutateAsync({
        id: item.id,
        pathname: item.storage_file_path,
        bucket_name: item.bucket_name,
      }),
      {
        loading: `Deleting ${item.name}`,
        success: "Your file has been successfully deleted!",
        error: (error) => error,
      },
      {
        id: item.id,
      }
    );

    if (params.imageId) {
      router.replace("/admin/gallery/");
    }

    setIsDeleteDialogOpen(false);
  }, []);

  const onBookmarkHandler = async () => {
    const bookmark = !item.is_bookmarked;

    await toast.promise(
      updateFileMutation.mutateAsync({
        item: item,
        formData: {
          ...item,
          is_bookmarked: bookmark,
        },
      }),
      {
        success: bookmark
          ? `Added ${item.name} bookmark.`
          : `Removed ${item.name} bookmark.`,
        loading: "Processing bookmark...",
        error: (error) => error,
      }
    );
  };

  return (
    <Fragment>
      <div
        className={classNames(
          [
            isSelected
              ? "bg-sky-100"
              : "bg-neutral-100 hover:bg-neutral-200/70",
          ],
          "text-neutral-700 p-2.5 rounded-md transition-all"
        )}
      >
        <div className="flex justify-between items-center mb-2.5">
          <div className="w-5 shrink-0 text-lg mr-0.5">
            <BiSolidImageAlt />
          </div>
          <div className="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden mr-2 flex-1 select-all">
            {item.name}
          </div>

          <DropdownRoot>
            <DropdownTrigger>
              <button className="cursor-pointer outline-none shrink-0">
                <BsThreeDotsVertical />
              </button>
            </DropdownTrigger>
            <DropdownContent className="w-52">
              <DropdownGroup>
                <DropdownItem
                  icon={<AiOutlineDownload />}
                  onClick={onDownloadHandler}
                >
                  Download
                </DropdownItem>
                <DropdownItem
                  icon={<AiOutlineEdit />}
                  onClick={() => setIsRenameDialogOpen(true)}
                >
                  Rename
                </DropdownItem>
                <DropdownItem
                  icon={<AiOutlineLink />}
                  onClick={onCopyLinkHandler}
                >
                  Copy link
                </DropdownItem>
              </DropdownGroup>
              <DropdownGroup>
                {item.is_bookmarked ? (
                  <DropdownItem
                    icon={<GoBookmarkFill />}
                    onClick={onBookmarkHandler}
                  >
                    Bookmarked
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    icon={<GoBookmark />}
                    onClick={onBookmarkHandler}
                  >
                    Bookmark
                  </DropdownItem>
                )}
                <DropdownItem
                  icon={<AiOutlineInfoCircle />}
                  onClick={() =>
                    router.push(`/admin/gallery/${item.id}${serialized}`)
                  }
                >
                  File information
                </DropdownItem>
              </DropdownGroup>
              <DropdownGroup>
                <DropdownItem
                  icon={<PiTrash />}
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete
                </DropdownItem>
              </DropdownGroup>
            </DropdownContent>
          </DropdownRoot>
        </div>

        <div
          className="relative aspect-square overflow-hidden cursor-pointer rounded-md group"
          onClick={() => setIsPreviewDialogOpen(true)}
        >
          <Suspense fallback={<ImageSkeletonLoader />}>
            {publicImageUrl.data ? (
              <Suspense
                fallback={
                  <BaseSkeletonLoader className="w-1/2 h-[20px] rounded-md" />
                }
              >
                <ExpandImagePreviewPlaceholder />
                <Image
                  src={publicImageUrl.data}
                  alt={item.name}
                  className="rounded-md pointer-events-none object-center object-cover w-full h-full"
                  width={480}
                  height={480}
                  quality={75}
                />
              </Suspense>
            ) : (
              <ImageSkeletonLoader />
            )}
          </Suspense>
        </div>
      </div>

      {isRenameDialogOpen && (
        <RenameDialog
          item={item}
          isOpen={isRenameDialogOpen}
          onClose={() => setIsRenameDialogOpen(false)}
        />
      )}

      {isDeleteDialogOpen && (
        <AlertDialog
          onConfirm={onDeleteHandler}
          isOpen={isDeleteDialogOpen}
          isLoading={deleteFileMutation.isPending}
          onClose={() => setIsDeleteDialogOpen(false)}
          confirmButtonText="Yes, proceed"
          confirmButtonColor="danger"
        >
          Are you sure you want to delete this?
        </AlertDialog>
      )}

      {isPreviewDialogOpen && (
        <ImagePreviewDialog
          item={{
            storage_file_path: item.storage_file_path,
            name: item.name,
            width: item.width,
            height: item.height,
          }}
          isOpen={isPreviewDialogOpen}
          onClose={() => setIsPreviewDialogOpen(false)}
        />
      )}
    </Fragment>
  );
};

export default GalleryItem;
