import { EpMerge, GLOBAL_COLOR } from "@ep/global";
import { Color, Disabled, EpClass, Size, Variant } from "./config";
import { CONTAINER_VARIANT, SWITCH_SIZE, THUMB_VARIANT } from "./consts";

export function getHostContainerClass(options: { size: Size, }): EpClass {
    const _ = {
        host: SWITCH_SIZE[options.size].w_h[0],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getContainerClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    disabled?: Disabled,
}): EpClass {
    const BASE_CONTAINER = options.disabled
        ? CONTAINER_VARIANT[options.variant]("secondary", options.size)
        : CONTAINER_VARIANT[options.variant](options.color, options.size)
    const _ = {
        container: BASE_CONTAINER
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getTrackClass(options: {
    color: Color,
    size: Size,
    disabled?: Disabled,
}): EpClass {
    const BASE_COLOR = options.disabled
        ? [
            GLOBAL_COLOR.base[20].bg["secondary"],
            GLOBAL_COLOR.peerchecked[100].bg["secondary"],
        ] : [
            GLOBAL_COLOR.base[20].bg[options.color],
            GLOBAL_COLOR.peerchecked[100].bg[options.color],
        ];
    const _ = {
        container: SWITCH_SIZE[options.size].w_h[1],
        color: BASE_COLOR
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getThumbClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    disabled?: Disabled,
}): EpClass {
    const BASE_THUMB = options.disabled
        ? THUMB_VARIANT[options.variant]("secondary", options.size)
        : THUMB_VARIANT[options.variant](options.color, options.size)
    const _ = { thumb: BASE_THUMB };
    return EpMerge.objectToStr(_).toClassNames();
}