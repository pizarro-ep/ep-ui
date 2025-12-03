import { GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_SMALL, EpMerge } from "@ep/global";
import { ITEM_DISABLED_VARIANTS, ITEM_HOVER_VARIANTS, ITEM_PADDINGS, ITEM_SELECTED_CLASS, ITEM_VARIANTS, LIST_HEIGHT, LIST_ITEM_SPACES } from "./consts";
import { Color, Disabled, EpClass, Expanded, Hoverable, Space, Rounded, Selected, Size, Variant } from "./config";

export function getListClass(options: { space?: Space }): EpClass {
    const _ = {
        space: options.space && LIST_ITEM_SPACES[options.space],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getSubListClass(options: { expanded?: Expanded }): EpClass {
    const BASE_HEIGHT = options.expanded ? LIST_HEIGHT[1] : LIST_HEIGHT[0]
    const _ = { height: BASE_HEIGHT, }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getItemClass(options: {
    variant: Variant,
    color: Color,
    selectedColor?: Color,
    size: Size,
    rounded?: Rounded,
    hoverable?: Hoverable,
    selected?: Selected,
    disabled?: Disabled,
}): EpClass {
    const BASE_ITEM = options.disabled
        ? ITEM_DISABLED_VARIANTS[options.variant]
        : (options.selected
            ? ITEM_VARIANTS[options.variant](options.selectedColor ?? options.color)
            : [ITEM_VARIANTS[options.variant](options.color), options.hoverable && ITEM_HOVER_VARIANTS[options.variant](options.color)]);

    const _ = {
        item: BASE_ITEM,
        padding: ITEM_PADDINGS[options.size],
        text: GLOBAL_TEXT_SIZE[options.size],
        rounded: options.rounded && GLOBAL_ROUNDED[options.rounded],
        brightness: (!options.disabled && options.selected) && ITEM_SELECTED_CLASS,
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getItemLabelClass(options: { size: Size }): EpClass {
    const _ = { text: GLOBAL_TEXT_SIZE[options.size], }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getItemSubLabelClass(options: { size: Size }): EpClass {
    const _ = { text: GLOBAL_TEXT_SIZE_SMALL[options.size], }
    return EpMerge.objectToStr(_).toClassNames();
}