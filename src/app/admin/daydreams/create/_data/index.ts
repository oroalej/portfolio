import {CreateDreamFormInterface} from "@/app/admin/daydreams/create/_types";

export const MAX_FILE_SIZE = 15728640; // 15MB
export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const DEFAULT_FORM_VALUES: CreateDreamFormInterface = {
    iso: 200,
    shutter_speed: 125,
    aperture: 2.8,
    year: new Date().getFullYear(),
    description: "",
    image: {
        file: null,
        width: 0,
        height: 0,
        name: "",
        type: ACCEPTED_IMAGE_TYPES[0],
        size: 0
    }
}

export const YEARS = [...Array(30)].map((_, index) => {
    const year = DEFAULT_FORM_VALUES.year - index;

    return {
        value: year,
        text: year.toString()
    }
});

export const ISO = [80, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800, 25600]
export const APERTURE = [2.8, 3.2, 3.6, 4, 4.5, 5, 5.6, 6.4, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22]
export const SHUTTER_SPEED = [1.6, 2, 2.5, 3, 4, 5, 6, 8, 13, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000];
