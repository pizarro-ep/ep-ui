import { EpMerge, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_SMALL } from "@ep/global";
import { CARD_DISABLED_VARIANTS, CARD_HOVER_VARIANTS, CARD_SIZES, CARD_VARIANTS } from "./consts";
import { Color, Disabled, EpClass, Hoverable, Rounded, Size, Variant } from "./config";

export function getCardClass(options: { variant: Variant, color: Color, size: Size, rounded: Rounded, hoverable?: Hoverable, disabled?: Disabled }): EpClass {
    const BASE_CLASSES = options.disabled
        ? CARD_DISABLED_VARIANTS[options.variant](options.color)
        : [
            CARD_VARIANTS[options.variant](options.color),
            options.hoverable && CARD_HOVER_VARIANTS[options.variant](options.color)
        ];
    const _ = {
        card: BASE_CLASSES,
        size: CARD_SIZES[options.size],
        text: GLOBAL_TEXT_SIZE[options.size],
        rounded: GLOBAL_ROUNDED[options.rounded],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getLabelClass(options: { size: Size }): EpClass {
    const _ = { text: GLOBAL_TEXT_SIZE[options.size] }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getSubLabelClass(options: { size: Size }): EpClass {
    const _ = { text: GLOBAL_TEXT_SIZE_SMALL[options.size] }
    return EpMerge.objectToStr(_).toClassNames();
}