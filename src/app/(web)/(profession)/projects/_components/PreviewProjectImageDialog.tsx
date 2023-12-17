import classNames from "classnames";
import ImagePreviewContainer from "@/components/Image/ImagePreviewContainer";
import SupabaseImage from "@/components/Image/SupabaseImage";
import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useGalleryContext } from "@/context/GalleryContext";
import {
  DialogProps,
  CardBody,
  CardRoot,
  Dialog,
  Window,
  Thumbnail,
  BaseSkeletonLoader,
  ExternalLink,
} from "@/components";
import { useLoadable } from "@/hooks";
import { useHotkeys } from "react-hotkeys-hook";
import {
  PiCode,
  PiFigmaLogoLight,
  PiGlobeHemisphereWestThin,
} from "react-icons/pi";
import { ProjectCardItem } from "@/app/admin/(modules)/projects/_components/ProjectCard";

interface PreviewProjectImageDialogProps
  extends Required<Omit<DialogProps, "children">>,
    Pick<
      ProjectCardItem,
      "title" | "repository_link" | "design_link" | "website_link"
    > {}

const PreviewProjectImageDialog = ({
  isOpen,
  onClose,
  title,
  website_link,
  design_link,
  repository_link,
}: PreviewProjectImageDialogProps) => {
  const { selectedItem, list, selectedIndex, setSelectedIndex } =
    useGalleryContext();
  const { isLoading, startLoading, endLoading } = useLoadable();
  const scale = selectedItem.width / 1920;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useHotkeys(["esc", "escape"], onClose);

  const onLoadingCompleteHandler = () => {
    imageContainerRef.current?.scrollTo({
      top: 0,
    });

    imageContainerRef.current?.focus();

    endLoading();
  };

  const onClickThumbnailHandler = (index: number) => {
    setSelectedIndex(index);
    startLoading();
  };

  useEffect(() => {
    startLoading();
  }, [selectedIndex]);

  return (
    <Dialog isOpen={isOpen}>
      <CardRoot rounded className="h-full">
        <CardBody>
          <div className="relative h-full max-w-[1920px] mx-auto">
            <div className="absolute right-1 top-0 z-10">
              <button
                className={classNames(
                  "text-neutral-800 outline-none p-2 cursor-pointer"
                )}
                onClick={onClose}
              >
                <MdClose size={28} />
              </button>
            </div>

            <ImagePreviewContainer>
              <div className="flex flex-row justify-between gap-12">
                <div className="flex flex-row shrink-0">
                  {list?.map((item, index) => (
                    <Thumbnail
                      key={`thumbnail-${index}-${item.name}`}
                      image={item}
                      isActive={index === selectedIndex}
                      onSelect={() => onClickThumbnailHandler(index)}
                    />
                  ))}
                </div>

                <div className="dark:text-neutral-200 flex flex-col xs:flex-row md:flex-col md:justify-start xs:items-end md:items-end flex-1 gap-2 mb-3 md:mb-0 sm:mr-16">
                  <p className="text-base sm:text-lg block whitespace-nowrap font-bold text-neutral-800 font-mono">
                    {title}
                  </p>

                  <div className="flex flex-row gap-4 sm:justify-end">
                    {repository_link && (
                      <ExternalLink
                        href={`https://github.com/${repository_link}`}
                        label="Code"
                        className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                        data-tooltip-id="guest-tooltip"
                        data-tooltip-content="Code"
                        data-tooltip-place="bottom"
                      >
                        <PiCode size={22} />
                      </ExternalLink>
                    )}

                    {website_link && (
                      <ExternalLink
                        href={`https://${website_link}`}
                        label="Link"
                        className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                        data-tooltip-id="guest-tooltip"
                        data-tooltip-content="Website"
                        data-tooltip-place="bottom"
                      >
                        <PiGlobeHemisphereWestThin size={22} />
                      </ExternalLink>
                    )}

                    {design_link && (
                      <ExternalLink
                        href={`https://www.figma.com/file/${design_link}`}
                        label="Figma"
                        className="transform hover:scale-110 cursor-pointer transition-colors text-neutral-800 dark:text-neutral-200"
                        data-tooltip-id="guest-tooltip"
                        data-tooltip-content="Design"
                        data-tooltip-place="bottom"
                      >
                        <PiFigmaLogoLight size={22} />
                      </ExternalLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex-1 px-14">
                <Window title={selectedItem.name}>
                  <div className="relative">
                    {isLoading && (
                      <div className="bg-white absolute inset-0 z-10">
                        <BaseSkeletonLoader
                          className="w-full"
                          style={{ height: "calc(100vh - 206px)" }}
                        />
                      </div>
                    )}

                    <div
                      className="overflow-y-auto relative scrollbar-w-2 scrollbar scrollbar-thumb-zinc-400 scrollbar-track-gray-200"
                      style={{
                        maxHeight: "calc(100vh - 206px)",
                      }}
                      ref={imageContainerRef}
                      tabIndex={-1}
                    >
                      <SupabaseImage
                        src={selectedItem.storage_file_path}
                        alt={selectedItem.name}
                        width={selectedItem.width / scale}
                        height={selectedItem.height / scale}
                        onLoadingComplete={onLoadingCompleteHandler}
                      />
                    </div>
                  </div>
                </Window>
              </div>
            </ImagePreviewContainer>
          </div>
        </CardBody>
      </CardRoot>
    </Dialog>
  );
};

export default PreviewProjectImageDialog;
