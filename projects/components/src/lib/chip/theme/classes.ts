import { EpMerge, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE } from "@ep/global";
import { CHIP_DISABLED_VARIANTS, CHIP_HOVER_VARIANTS, CHIP_PADDINGS, CHIP_VARIANTS } from "./consts";
import { Color, Disabled, EpClass, Rounded, Size, Variant } from "./config";

export function getChipClass(options: {
    variant: Variant,
    color: Color,
    size: Size,
    rounded: Rounded,
    disabled?: Disabled,
    hoverable?: boolean,
}): EpClass {
    const BASE_CLASSES = options.disabled
        ? CHIP_DISABLED_VARIANTS[options.variant](options.color)
        : [
            CHIP_VARIANTS[options.variant](options.color),
            options.hoverable && CHIP_HOVER_VARIANTS[options.variant](options.color)
        ];
    const _ = {
        chip: BASE_CLASSES,
        text: GLOBAL_TEXT_SIZE[options.size],
        padding: CHIP_PADDINGS[options.size],
        rounded: GLOBAL_ROUNDED[options.rounded],

    }
    return EpMerge.objectToStr(_).toClassNames();
}