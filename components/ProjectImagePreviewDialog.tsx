import {FC, MutableRefObject, useEffect, useRef, useState} from "react";
import {useLoadable} from "@/hooks/index";
import {
  Dialog,
  ExternalLink,
  ImageLoadingIndicator,
  ProjectWithScreenshotsInterface,
  ScreenshotInterface,
  Thumbnail,
  Window
} from "@/components/index";
import {Code, GlobeHemisphereEast, X} from "phosphor-react";
import {kebabCase} from "lodash";
import Image from "next/image";

interface previewDialogInterface {
  project: ProjectWithScreenshotsInterface;
  isOpen: boolean,
  onClose: () => void
}

const RESET_SCREENSHOT_STATE = {
  title: "",
  filename: "",
  width: 0,
  height: 0
}

const ProjectImagePreviewDialog: FC<previewDialogInterface> = (props: previewDialogInterface) => {
  const {onClose, isOpen, project} = props;
  const {title, site, source, screenshots} = project;
  const {isLoading, startLoading, endLoading} = useLoadable();
  const [activeImage, setActiveImage] = useState(RESET_SCREENSHOT_STATE);
  const FauxWindow = useRef() as MutableRefObject<HTMLInputElement>;

  const isScreenshotActive = (screenshot: ScreenshotInterface): boolean => {
    return activeImage.filename === screenshot.filename
  }

  const onThumbnailPreview = (screenshot: ScreenshotInterface): void => {
    setActiveImage(screenshot)
    startLoading()
  }

  useEffect(() => {
    if (screenshots.length) {
      setActiveImage(screenshots[0])
    }
  }, [screenshots])

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div
        className="w-full max-w-full min-h-screen h-full block relative p-3.5 md:p-6 overflow-hidden text-left align-middle transition-all transform bg-neutral-100 dark:bg-neutral-800">
        <div className="flex flex-col h-full divide-y-2 divide-neutral-200">
          <div className="flex flex-col-reverse w-full md:flex-row justify-between md:pr-9">
            <div className="flex flex-row overflow-x-auto pb-2 md:pb-3.5">
              {
                screenshots.map((screenshot) => (
                  <div
                    className={`${isLoading && !isScreenshotActive(screenshot) ? "pointer-events-none" : ""}`}
                    key={kebabCase(screenshot.title)}
                  >
                    <div
                      onClick={() => !isScreenshotActive(screenshot) && onThumbnailPreview(screenshot)}
                      className={`m-1.5 w-20 overflow-hidden rounded-md border border-solid border-gray-300 ${isScreenshotActive(screenshot) ? "ring-2 ring-offset-[3px] ring-rose-600 dark:ring-offset-neutral-800" : ""}`}
                    >
                      <Thumbnail
                        image={screenshot}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <span
              className="cursor-pointer p-2 absolute right-2 top-2 md:right-4 md:top-4 text-gray-700 dark:text-gray-200 active:scale-105 transition-transform"
              onClick={onClose}>
              <X size={26} weight="regular"/>
            </span>

            <div
              className="dark:text-neutral-200 flex flex-col xs:flex-row md:flex-col md:justify-start xs:items-end md:items-end flex-1 gap-2 mb-3 md:mb-0 sm:mr-14 md:mr-0">
              <p className="text-lg sm:text-xl block">{title}</p>

              <div className="flex flex-row gap-4 sm:justify-end">
                {
                  source && (
                    <ExternalLink href={source} label="Code"
                                  className="transform hover:scale-110 transition-transform cursor-pointer text-xl transition-colors text-rose-600 dark:text-neutral-200">
                      <Code weight="light"/>
                    </ExternalLink>
                  )
                }
                {
                  site && (
                    <ExternalLink href={site} label="Link"
                                  className="transform hover:scale-110 transition-transform cursor-pointer text-xl transition-colors text-rose-600 dark:text-neutral-200">
                      <GlobeHemisphereEast weight="light"/>
                    </ExternalLink>
                  )
                }
              </div>
            </div>
          </div>
          <div className="pt-2 md:pt-3.5 overflow-hidden">
            <Window title={activeImage.title}>
              {isLoading && <ImageLoadingIndicator/>}

              <div className="relative overflow-hidden max-h-[400px] lg:max-h-[941px] h-full">
                <div className={`overflow-y-auto relative h-full backdrop-blur-sm`} ref={FauxWindow}>
                  <div className="pointer-events-none">
                    <Image src={`/images/projects/${activeImage.filename}`}
                           alt="something"
                           layout="responsive"
                           objectFit="fill"
                           width={activeImage.width}
                           height={activeImage.height}
                           onLoadingComplete={endLoading}
                    />
                  </div>
                </div>
              </div>
            </Window>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ProjectImagePreviewDialog;
