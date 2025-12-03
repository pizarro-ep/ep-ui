import { EpMerge, GLOBAL_COLOR, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_LARGE } from "@ep/global";
import { Color, EpClass, Rounded, Size, Variant } from "./config";
import { CONTAINER_SIZE, CONTAINER_VARIANTS, INPUT_LABEL_SIZE, LABEL_SIZE } from "./consts";

export function getContainerClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded,
    disabled?: boolean,
    leftBorder?: boolean,
    rightBorder?: boolean,
}): EpClass {
    const { paddingX, paddingY } = INPUT_LABEL_SIZE[options.size];

    const BASE_PADDING_X = options.variant === 'underlined'
        ? '' : [options.leftBorder ? 'pl-1' : paddingX[0], options.rightBorder ? 'pr-1' : paddingX[1]];

    const BASE_CONTAINER = options.disabled
        ? CONTAINER_VARIANTS[options.variant]("secondary")
        : CONTAINER_VARIANTS[options.variant](options.color);

    const _ = {
        container: BASE_CONTAINER,
        px: BASE_PADDING_X,
        py: paddingY,
        rounded: (options.variant !== 'underlined') && GLOBAL_ROUNDED[options.rounded],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getFieldContainerClass(options: { size: Size }): EpClass {
    const _ = {
        container: CONTAINER_SIZE[options.size],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getTextareaClass(options: {
    size: Size,
}): EpClass {
    const _ = {
        text: GLOBAL_TEXT_SIZE[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
}): EpClass {
    const _ = {
        text: [
            GLOBAL_COLOR.base[75].text[options.color],
            LABEL_SIZE[options.size],
        ],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getInnerIconClass(options: { size: Size }): EpClass {
    const _ = {
        size: GLOBAL_TEXT_SIZE_LARGE[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getOuterIconClass(options: { size: Size }): EpClass {
    const _ = {
        size: [
            GLOBAL_TEXT_SIZE_LARGE[options.size],
            INPUT_LABEL_SIZE[options.size].paddingY,
        ],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelFloatingContainerClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded,
}): EpClass {
    const _ = {
        size: INPUT_LABEL_SIZE[options.size].heigth,
    }
    return EpMerge.objectToStr(_).toClassNames();
}

