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

export const PreviewDreamDialog = (props: Required<Omit<DialogProps, 'children'>>) => {
    const {onClose, isOpen} = props;
    const storagePublicUrl = getStoragePublicUrl("")
    const {selectedItem, onNext, onPrev, isFirst, isLast} = useGalleryContext();
    const {isLoading, startLoading, endLoading} = useLoadable();

    console.log('rerender');

    return (
        <Dialog isOpen={isOpen}>
            <CardRoot rounded className="h-full">
                <div className="p-6 flex flex-row h-full gap-8">
                    <div className="absolute right-2 top-2 md:right-3.5 md:top-3.5 z-10">
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
                        className="relative flex justify-between items-center px-3 overflow-hidden grow bg-neutral-200 rounded-md">
                        <Image
                            src={`${storagePublicUrl}/${selectedItem.file.storage_file_path}`}
                            alt={selectedItem.description}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain pointer-events-none"
                            quality={75}
                            placeholder="blur"
                            blurDataURL={`${storagePublicUrl}${selectedItem.file.storage_file_path}`}
                            onLoadingComplete={endLoading}
                            onLoadStart={startLoading}
                        />

                        {isLoading && (
                            <div className="absolute inset-0 z-10 bg-neutral-100">
                                <ImageSkeletonLoader/>
                            </div>
                        )}

                        <Button
                            icon
                            rounded
                            variant="plain"
                            color="secondary"
                            disabled={isFirst}
                            className={isFirst ? "invisible !pointer-events-none" : ""}
                            onClick={onPrev}
                        >
                            <FaChevronLeft size={20}/>
                        </Button>

                        <Button
                            icon
                            rounded
                            variant="plain"
                            color="secondary"
                            disabled={isLast}
                            className={isLast ? "invisible !pointer-events-none" : ""}
                            onClick={onNext}
                        >
                            <FaChevronRight size={20}/>
                        </Button>
                    </div>

                    <div className="w-80">
                        <h3 className="text-lg  text-neutral-600 mb-2">Details:</h3>

                        <FormGroup>
                            <Label className="!mb-0">Year</Label>
                            {isLoading ? <BaseSkeletonLoader/> : (
                                <p className="text-neutral-700 text-lg">{selectedItem.year}</p>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label className="!mb-0">Description</Label>
                            {isLoading ? <BaseSkeletonLoader/> : (
                                <p className="text-neutral-700 text-lg">{selectedItem.description}</p>
                            )}
                        </FormGroup>

                        <h3 className="text-lg  text-neutral-600 mb-2">Camera Setting:</h3>

                        <FormGroup>
                            <Label className="!mb-0">
                                <abbr title="International Organization for Standardization">ISO</abbr>
                            </Label>
                            {isLoading ? <BaseSkeletonLoader/> : (
                                <p className="text-neutral-700 text-lg">{selectedItem.iso} ISO</p>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label className="!mb-0">Shutter Speed</Label>
                            {isLoading ? <BaseSkeletonLoader/> : (
                                <p className="text-neutral-700 text-lg">{selectedItem.shutter_speed} SS</p>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label className="!mb-0">Aperture</Label>
                            {isLoading ? <BaseSkeletonLoader/> : (
                                <p className="text-neutral-700 text-lg">{selectedItem.aperture} A</p>
                            )}
                        </FormGroup>
                    </div>
                </div>
            </CardRoot>
        </Dialog>
    )
}
