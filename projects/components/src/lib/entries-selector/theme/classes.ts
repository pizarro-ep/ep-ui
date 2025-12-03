import { EpMerge, GLOBAL_TEXT_SIZE } from "@ep/global";
import { SIZE_CLASS } from "./consts";
import { Size } from "./config";

export function getContainerClass(options: { size: Size }) {
    const _ = { size: SIZE_CLASS[options.size], }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelSize(options: { size: Size }) {
    const _ = { size: GLOBAL_TEXT_SIZE[options.size] }
    return EpMerge.objectToStr(_).toClassNames();
}