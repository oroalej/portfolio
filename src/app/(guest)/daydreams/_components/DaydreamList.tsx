"use client";

import {Fragment, useEffect, useState} from "react";
import DreamCard from "@/app/(guest)/daydreams/_components/DreamCard";
import {getAllDaydreams} from "@/api/DaydreamAPI";
import ImageAPI from "@/api/ImageAPI";
import {DreamCardProps} from "@/app/(guest)/daydreams/_types";

const DaydreamList = () => {
    const [list, setList] = useState<DreamCardProps[]>([])
    const storagePublicUrl = ImageAPI.get("")

    useEffect(() => {
        try {
            getAllDaydreams().then(({data}) => {
                setList(data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <Fragment>
            {list.map((item, index) => (
                <DreamCard
                    image_path={`${storagePublicUrl}${item.image_path}`}
                    key={`image-${index}`}
                    iso={item.iso}
                    shutter_speed={item.shutter_speed}
                    aperture={item.aperture}
                    year={item.year}
                    description={item.description}
                />
            ))}
        </Fragment>
    )
}
export default DaydreamList;
