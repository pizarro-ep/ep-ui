import { EpMerge, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE } from "@ep/global";
import { Color, Disabled, EpClass, Rounded, Size, Variant } from "./config";
import { CONTAINER_VARIANT, INPUT_VARIANT, LABEL_VARIANT, SIZE_CLASS } from "./consts";

export function getContainerClass(options: {
    variant: Variant,
    color: Color, size:
    Size, rounded: Rounded,
    disabled?: Disabled,
}): EpClass {
    const BASE_CONTAINER = CONTAINER_VARIANT[options.variant](options.disabled ? "secondary" : options.color)
    const _ = {
        container: BASE_CONTAINER,
        padding: (options.variant === 'bordered') && SIZE_CLASS[options.size].padding,
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getCheckboxClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded,
    disabled?: Disabled,
}): EpClass {
    const BASE_INPUT = INPUT_VARIANT[options.variant](options.disabled ? "secondary" : options.color)
    const _ = {
        input: BASE_INPUT,
        padding: (options.variant === 'bordered') && SIZE_CLASS[options.size].padding,
        size: SIZE_CLASS[options.size].size,
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded,
    disabled?: Disabled,
}): EpClass {
    const BASE_LABEL = LABEL_VARIANT[options.variant](options.disabled ? "secondary" : options.color)
    const _ = {
        label: BASE_LABEL,
        padding: (options.variant === 'advanced') && SIZE_CLASS[options.size].padding,
        text: GLOBAL_TEXT_SIZE[options.size],
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}