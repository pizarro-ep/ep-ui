import { EpMerge, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE } from "@ep/global";
import { Color, EpClass, Rounded, Size, Variant } from "./config";
import { CONTAINER_VARIANT, INPUT_VARIANT, LABEL_VARIANT, SIZE_CLASS } from "./consts";

export function getContainerClass(options: { variant: Variant, color: Color, size: Size, rounded: Rounded }): EpClass {
    const _ = {
        container: CONTAINER_VARIANT[options.variant](options.color),
        padding: (options.variant === 'bordered') && SIZE_CLASS[options.size].padding,
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getRadioClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded
}): EpClass {
    const _ = {
        input: INPUT_VARIANT[options.variant](options.color),
        padding: (options.variant === 'bordered') && SIZE_CLASS[options.size].padding,
        size: SIZE_CLASS[options.size].size,
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelClass(options: { variant: Variant, color: Color, size: Size, rounded: Rounded }): EpClass {
    const _ = {
        label: LABEL_VARIANT[options.variant](options.color),
        padding: (options.variant === 'advanced') && SIZE_CLASS[options.size].padding,
        text: GLOBAL_TEXT_SIZE[options.size],
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}