import { EpMerge, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE } from "@ep/global";
import { ButtonType, Color, Disabled, EpClass, Rounded, Size, Variant } from "./config";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./consts";

export function getButtonClass(options: { variant: Variant, color: Color, rounded: Rounded, size: Size, type: ButtonType, disabled?: Disabled }): EpClass {
    const BASE_BUTTON = options.disabled ? BUTTON_VARIANTS[options.variant]("secondary") : BUTTON_VARIANTS[options.variant](options.color);
    const BASE_SIZE = options.type === 'icon' ? BUTTON_SIZES[options.size].icon : BUTTON_SIZES[options.size].button;

    const _ = {
        button: BASE_BUTTON,
        text: GLOBAL_TEXT_SIZE[options.size],
        rounded: GLOBAL_ROUNDED[options.rounded],
        size: BASE_SIZE,
    }

    return EpMerge.objectToStr(_).toClassNames();
}