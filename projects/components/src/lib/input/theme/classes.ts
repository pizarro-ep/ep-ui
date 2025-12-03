import { EpMerge, GLOBAL_COLOR, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE } from "@ep/global";
import { Color, EpClass, InputType, Rounded, Size, Variant } from "./config";
import { CONTAINER_SIZE, CONTAINER_VARIANTS, INPUT_LABEL_SIZE, LABEL_SIZE, NUMBER_ICON_VARIANTS, } from "./consts";

export function getContainerClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    type: InputType,
    rounded: Rounded,
    disabled?: boolean,
    leftBorder?: boolean,
    rightBorder?: boolean,
}): EpClass {
    const { paddingX, } = INPUT_LABEL_SIZE[options.size];

    const BASE_PADDING_X = options.variant === 'underlined' || options.type === 'number'
        ? '' : [options.leftBorder ? 'pl-1' : paddingX[0], options.rightBorder ? 'pr-1' : paddingX[1]];

    const BASE_CONTAINER = options.disabled
        ? CONTAINER_VARIANTS[options.variant]("secondary")
        : CONTAINER_VARIANTS[options.variant](options.color);

    const _ = {
        container: BASE_CONTAINER,
        px: BASE_PADDING_X,
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

export function getInputClass(options: {
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

export function getNumberIconClass(options: { variant: Variant, color: Color }): EpClass {
    const _ = {
        numberIcon: NUMBER_ICON_VARIANTS[options.variant](options.color),
        text: GLOBAL_COLOR.base[100].text[options.color],
    }
    return EpMerge.objectToStr(_).toClassNames();
}