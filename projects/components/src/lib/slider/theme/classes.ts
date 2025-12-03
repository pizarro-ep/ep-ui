import { EpMerge, GLOBAL_COLOR, GLOBAL_TEXT_SIZE } from "@ep/global";
import { Color, Disabled, EpClass, ReadOnly, Size } from "./config";
import { COMMON_DISABLED, COMMON_READONLY, INPUT_COLOR, INPUT_READONLY, INPUT_SIZE, LABEL_COLOR, LABEL_DISABLED_COLOR, TRACK_ROUNDED, SLIDER_SIZES, TRACK_UNDER_WIDTH } from "./consts";

export function getContainerClass(options: { size: Size }): EpClass {
    const _ = {
        size: SLIDER_SIZES[options.size].container
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getInputClass(options: {
    color: Color,
    size: Size,
    readonly?: ReadOnly
}): EpClass {
    const INPUT_BASE = [options.readonly && INPUT_READONLY];
    const _ = {
        input: INPUT_BASE,
        color: INPUT_COLOR[options.color],
        size: [INPUT_SIZE[options.size]],
    }
    return EpMerge.objectToStr(_).toClassNames();
}


export function getTrackOverClass(options: {
    color: Color,
    size: Size,
    readonly?: ReadOnly,
    disabled?: Disabled
}): EpClass {
    const TRACK_BASE = options.disabled
        ? [COMMON_DISABLED, GLOBAL_COLOR.base[75].bg.secondary]
        : [GLOBAL_COLOR.base[75].bg[options.color], options.readonly && COMMON_READONLY];
    const _ = {
        track: TRACK_BASE,
        size: SLIDER_SIZES[options.size].over,
        rounded: TRACK_ROUNDED[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getTrackUnderClass(options: {
    color: Color,
    size: Size,
    readonly?: ReadOnly,
    disabled?: Disabled
}): EpClass {
    const TRACK_BASE = options.disabled
        ? [COMMON_DISABLED, GLOBAL_COLOR.base[20].bg.secondary]
        : [GLOBAL_COLOR.base[20].bg[options.color], options.readonly && COMMON_READONLY];
    const _ = {
        track: TRACK_BASE,
        width: TRACK_UNDER_WIDTH,
        size: SLIDER_SIZES[options.size].under,
        rounded: TRACK_ROUNDED[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelClass(options: { size: Size, readonly?: ReadOnly, disabled?: Disabled }): EpClass {
    const LABEL_BASE = options.disabled
        ? [LABEL_DISABLED_COLOR, COMMON_DISABLED]
        : [LABEL_COLOR, options.readonly && COMMON_READONLY];
    const _ = {
        label: LABEL_BASE,
        size: GLOBAL_TEXT_SIZE[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getIconClass(options: {
    color: Color,
    size: Size,
    readonly?: ReadOnly,
    disabled?: Disabled
}): EpClass {
    const BASE_COLOR = options.disabled
        ? [LABEL_DISABLED_COLOR, COMMON_DISABLED]
        : [GLOBAL_COLOR.base[100].text[options.color], options.readonly && COMMON_READONLY];
    const _ = {
        color: BASE_COLOR,
        size: GLOBAL_TEXT_SIZE[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}