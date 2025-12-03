import { EpMerge, GLOBAL_COLOR, GLOBAL_HEIGHT_SIZE, GLOBAL_PADDING, GLOBAL_ROUNDED, GLOBAL_WIDTH_SIZE } from "@ep/global";
import { Color, EpClass, Height, Padding, Rounded, Width } from "./config";

export function getHostClass(options: {
    color?: Color,
    rounded?: Rounded,
    width?: Width,
    height?: Height,
    padding?: Padding,
}): EpClass {
    const _ = {
        color: options.color && GLOBAL_COLOR.base[100].bg[options.color],
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
        width: options.width && GLOBAL_WIDTH_SIZE.base[options.width],
        height: options.height && GLOBAL_HEIGHT_SIZE.base[options.height],
        padding: options.padding && GLOBAL_PADDING.base[options.padding],
    }
    return EpMerge.objectToStr(_).toClassNames();
}