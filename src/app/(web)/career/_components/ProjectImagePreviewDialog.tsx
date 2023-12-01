"use client";

import {useEffect, useState} from "react";
import {useLoadable} from "@/hooks";
import {
    Button,
    Card,
    Dialog,
    DialogProps,
    ExternalLink,
    ImageLoadingIndicator,
    ProjectWithScreenshotsInterface,
    ScreenshotInterface,
    Thumbnail,
    Window
} from "@/components";
import Image from "next/image";
import {PiCode, PiGlobeHemisphereWestThin} from "react-icons/pi";
import {kebabCase} from "@/utils";
import {MdClose} from "react-icons/md";

interface ProjectImageDialogProps extends Required<Omit<DialogProps, 'children'>> {
    item: ProjectWithScreenshotsInterface;
}

const RESET_SCREENSHOT_STATE = {
    title: "",
    filename: "",
    width: 0,
    height: 0
}

const ProjectImagePreviewDialog = (props: ProjectImageDialogProps) => {
    const {onClose, isOpen, item} = props;
    const {title, site, source, screenshots} = item;
    const {isLoading, startLoading, endLoading} = useLoadable();
    const [activeImage, setActiveImage] = useState(RESET_SCREENSHOT_STATE);

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
        <Dialog isOpen={isOpen}>
            <Card rounded className="!flex flex-col h-full">
                <Card.Header className="flex flex-col-reverse md:flex-row justify-between md:mr-12 md:gap-6">
                    <div className="flex flex-row overflow-x-auto pb-2.5 lg:pb-0">
                        {screenshots.map((screenshot) => (
                            <div
                                className={`${isLoading && !isScreenshotActive(screenshot) ? "pointer-events-none" : ""}`}
                                key={kebabCase(screenshot.title)}
                            >
                                <Thumbnail
                                    image={screenshot}
                                    isActive={isScreenshotActive(screenshot)}
                                    onSelect={() => !isScreenshotActive(screenshot) && onThumbnailPreview(screenshot)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="absolute right-2 top-2 md:right-3.5 md:top-3.5">
                        <Button
                            icon
                            rounded
                            variant="plain"
                            onClick={onClose}
                            color="secondary"
                        >
                            <MdClose size={22}/>
                        </Button>
                    </div>

                    <div
                        className="dark:text-neutral-200 flex flex-col xs:flex-row md:flex-col md:justify-start xs:items-end md:items-end flex-1 gap-2 mb-3 md:mb-0 sm:mr-14 md:mr-0">
                        <p className="text-base sm:text-xl block whitespace-nowrap">{title}</p>

                        <div className="flex flex-row gap-4 sm:justify-end">
                            {source && (
                                <ExternalLink
                                    href={source}
                                    label="Code"
                                    className="transform hover:scale-110 transition-transform cursor-pointer text-xl transition-colors text-rose-600 dark:text-neutral-200"
                                >
                                    <PiCode/>
                                </ExternalLink>
                            )}

                            {site && (
                                <ExternalLink
                                    href={site}
                                    label="Link"
                                    className="transform hover:scale-110 transition-transform cursor-pointer text-xl transition-colors text-rose-600 dark:text-neutral-200"
                                >
                                    <PiGlobeHemisphereWestThin/>
                                </ExternalLink>
                            )}
                        </div>
                    </div>
                </Card.Header>

                <hr className="h-px mx-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                <Card.Body className="grow overflow-hidden">
                    <Window title={activeImage.title}>
                        {isLoading && <ImageLoadingIndicator/>}

                        <div className="relative overflow-hidden max-h-[400px] lg:max-h-[941px] h-full">
                            <div className="overflow-y-auto relative h-full">
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
                </Card.Body>
            </Card>
        </Dialog>
    )
}

export default ProjectImagePreviewDialog;
