"use client";

import {Fragment, useEffect, useState} from "react";
import {getAllDaydreams} from "@/api/DaydreamAPI";
import {getStoragePublicUrl} from "@/api/ImageAPI";
import {DaydreamCard, DaydreamCardLoading} from "@/app/(guest)/daydreams/_components/DaydreamCard";
import {PreviewDreamDialog} from "@/app/(guest)/daydreams/_components/PreviewDreamDialog";
import {useOpenable} from "@/hooks";
import {useGalleryContext} from "@/context/GalleryContext";

const DaydreamList = () => {
    const {list = [], setList, setSelectedIndex, selectedIndex} = useGalleryContext();
    const [isLoading, setIsLoading] = useState(true);
    const {isOpen, onOpen, onClose} = useOpenable()

    const storagePublicUrl = getStoragePublicUrl("");

    useEffect(() => {
        try {
            setIsLoading(true);

            getAllDaydreams().then(({data}) => {
                setList(data);
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [setList])

    const onSelectHandler = (index: number) => {
        setSelectedIndex(index);
        onOpen();
    }

    return (
        <Fragment>
            {isLoading ? [...Array(2)].map((_, index) => (
                <DaydreamCardLoading
                    key={`daydream-loader-${index}`}
                />
            )) : list.length ? list.map((item, index) => (
                <DaydreamCard
                    key={`image-${item.id}-${index}`}
                    image_path={`${storagePublicUrl}${item.file.storage_file_path}`}
                    iso={item.iso}
                    shutter_speed={item.shutter_speed}
                    aperture={item.aperture}
                    year={item.year}
                    description={item.description}
                    onSelect={() => onSelectHandler(index)}
                />
            )): (
                <div className="text-center col-span-2">
                    {"I'm sorry, I haven't uploaded yet..."}
                </div>
            )}

            {Number.isInteger(selectedIndex) && (
                <PreviewDreamDialog onClose={onClose} isOpen={isOpen}/>
            )}
        </Fragment>
    )
}
export default DaydreamList;
