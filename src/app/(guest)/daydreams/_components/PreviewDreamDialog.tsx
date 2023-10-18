"use client";

import {
    BaseSkeletonLoader,
    Button,
    CardRoot,
    Dialog,
    DialogProps,
    FormGroup,
    ImageSkeletonLoader,
    Label
} from "@/components";
import Image from "next/image";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {MdClose} from "react-icons/md";
import {useGalleryContext} from "@/context/GalleryContext";
import {useLoadable} from "@/hooks";
import {useEffect, useRef, useState} from "react";

export const PreviewDreamDialog = (props: Required<Omit<DialogProps, 'children'>>) => {
    const {onClose, isOpen} = props;
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const {selectedItem, onNext, onPrev, isFirst, isLast} = useGalleryContext();
    const {isLoading, startLoading, endLoading} = useLoadable();
    const [scale, setScale] = useState({
        height: 0,
        width: 0
    });

    useEffect(() => {
        startLoading();
    }, [selectedItem.file.storage_file_path])

    useEffect(() => {
        if (!isLoading) return;

        const scale = Number(selectedItem.file.height) / Number(imageContainerRef.current?.clientHeight || 1)

        setScale({
            height: Number(selectedItem.file.height) / scale,
            width: Number(selectedItem.file.width) / scale
        })
    }, [isLoading, selectedItem.file])

    return (
        <Dialog isOpen={isOpen}>
            <CardRoot rounded className="h-full max-w-[1920px] mx-auto">
                <div className="p-3.5 md:p-6 flex flex-col lg:flex-row h-full gap-2 lg:gap-8">
                    <div className="absolute right-2 top-2 md:right-3.5 md:top-3.5 z-10">
                        <Button
                            icon
                            rounded
                            variant="plain"
                            color="secondary"
                            size="small"
                            onClick={onClose}
                        >
                            <MdClose size={22}/>
                        </Button>
                    </div>

                    <div
                        className="relative flex justify-between items-center lg:px-3 overflow-hidden grow bg-neutral-200 rounded-md mt-12 lg:mt-0"
                    >
                        {isLoading && (
                            <div className="absolute inset-0 z-10 bg-neutral-100">
                                <ImageSkeletonLoader/>
                            </div>
                        )}

                        <div className="hidden md:block">
                            <Button
                                icon
                                rounded
                                variant="plain"
                                color="secondary"
                                size="small"
                                disabled={isFirst}
                                className={isFirst ? "invisible !pointer-events-none" : ""}
                                onClick={onPrev}
                            >
                                <FaChevronLeft size={20}/>
                            </Button>
                        </div>

                        <div className="relative grow h-full" ref={imageContainerRef}>
                            <Image
                                className="object-contain pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                src={getStoragePublicUrl(selectedItem.file.storage_file_path)}
                                alt={selectedItem.description}
                                width={scale.width}
                                height={scale.height}
                                quality={75}
                                style={{width: 'auto', height: '100%'}}
                                onLoadingComplete={endLoading}
                                onLoad={endLoading}
                            />
                        </div>

                        <div className="hidden md:block">
                            <Button
                                icon
                                rounded
                                variant="plain"
                                color="secondary"
                                size="small"
                                disabled={isLast}
                                className={isLast ? "invisible !pointer-events-none" : ""}
                                onClick={onNext}
                            >
                                <FaChevronRight size={20}/>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse lg:flex-col w-full lg:w-80">
                        <div className="grow text-right lg:grow-0 lg:text-left">
                            <h3 className="hidden lg:block text-lg font-bold capitalize text-neutral-600 dark:text-white mb-2">Details:</h3>

                            <FormGroup>
                                <Label className="!mb-0">Year</Label>
                                {isLoading ? <BaseSkeletonLoader style={{height: "28px"}}/> : (
                                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">{selectedItem.year}</p>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label className="!mb-0">Description</Label>
                                {isLoading ? <BaseSkeletonLoader style={{height: "28px"}}/> : (
                                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">{selectedItem.description}</p>
                                )}
                            </FormGroup>
                        </div>

                        <div className="grow">
                            <h3 className="hidden lg:block ext-lg font-bold capitalize text-neutral-600 dark:text-white mb-2">Camera
                                Setting:</h3>

                            <FormGroup>
                                <Label className="!mb-0">
                                    <abbr title="International Organization for Standardization">ISO</abbr>
                                </Label>
                                {isLoading ? <BaseSkeletonLoader style={{height: "28px"}}/> : (
                                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">{selectedItem.iso}</p>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label className="!mb-0">
                                    <span className="hidden xs:block">Shutter Speed</span>
                                    <span className="xs:hidden"><abbr title="Shutter Speed">SS</abbr></span>
                                </Label>
                                {isLoading ? <BaseSkeletonLoader style={{height: "28px"}}/> : (
                                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">{selectedItem.shutter_speed}</p>
                                )}
                            </FormGroup>

                            <FormGroup>
                                <Label className="!mb-0">Aperture</Label>
                                {isLoading ? <BaseSkeletonLoader style={{height: "28px"}}/> : (
                                    <p className="text-neutral-700 dark:text-white text-sm lg:text-lg">{selectedItem.aperture}</p>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </CardRoot>
        </Dialog>
    )
}
