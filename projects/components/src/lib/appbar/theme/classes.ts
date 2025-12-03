import { GLOBAL_COLOR, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE, GET_GLOBAL_GAPS, GET_GLOBAL_PADDINGS, EpMerge } from "@ep/global";
import { Color, EpClass, Gap, Padding, Rounded, Size } from "./config";
import { CLASSES } from "./consts";

export function getHostClass(options: { rounded?: Rounded }): EpClass {
    const _ = { host: CLASSES.HOST, rounded: options.rounded && GLOBAL_ROUNDED[options.rounded] }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getHeaderClass(): EpClass {
    return EpMerge.objectToStr(CLASSES.HEADER).toClassNames();
}

export function getHeaderButtonClass(): EpClass {
    return EpMerge.objectToStr(CLASSES.HEADER_BUTTON).toClassNames();
}

export function getHeaderLabelClass(options: { size?: Size, color?: Color }): EpClass {
    const _ = {
        label: CLASSES.HEADER_LABEL,
        text: [
            options.size && GLOBAL_TEXT_SIZE[options.size],
            options.color && GLOBAL_COLOR.base[100].text[options.color],
        ],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getMenuClass(options: { padding?: Padding, gap: Gap }): EpClass {
    const _ = {
        menu: CLASSES.MENU,
        padding: options.padding && GET_GLOBAL_PADDINGS(options.padding),
        gap: options.gap && GET_GLOBAL_GAPS(options.gap),
    }
    return EpMerge.objectToStr(_).toClassNames();
}