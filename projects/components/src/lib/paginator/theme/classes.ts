import { EpMerge, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_SMALL } from "@ep/global";
import { EpClass, Size } from "./config";
import { BUTTON_CONTAINER_SIZE } from "./const";

export function getButtonContainerClass(options: { size: Size }): EpClass {
    const _ = {
        size: BUTTON_CONTAINER_SIZE[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getIconClass(options: { size: Size }): EpClass {
    const _ = {
        text: GLOBAL_TEXT_SIZE[options.size]
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getTextClass(options: { size: Size }): EpClass {
    const _ = {
        text: GLOBAL_TEXT_SIZE_SMALL[options.size]
    }
    return EpMerge.objectToStr(_).toClassNames();
}