import { EpMerge, GET_GLOBAL_GAPS, GET_GLOBAL_PADDINGS } from "@ep/global";
import { EpClass, IGap, IPadding } from "./config";
import { CLASSES } from "./consts";

export function getHostClass(): EpClass {
    return EpMerge.objectToStr(CLASSES.HOST).toClassNames();
}

export function getHeaderClass(): EpClass {
    return EpMerge.objectToStr(CLASSES.HEADER).toClassNames();
}

export function getContentClass(options: { padding?: IPadding, gap?: IGap }): EpClass {
    const _ = {
        content: CLASSES.CONTENT,
        padding: options.padding && GET_GLOBAL_PADDINGS(options.padding),
        gap: options.gap && GET_GLOBAL_GAPS(options.gap)
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getFooterClass(): EpClass {
    return EpMerge.objectToStr(CLASSES.FOOTER).toClassNames();
}