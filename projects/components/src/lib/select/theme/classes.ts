import { EpMerge, GLOBAL_COLOR, GLOBAL_ROUNDED, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_SMALL, } from "@ep/global";
import { Color, EpClass, PositionX, PositionY, Rounded, Size } from "./config";
import { ITEM_SIZE, PANEL_POSITION_X, PANEL_POSITION_Y } from "./consts";

export function getPanelClass(options: {
    positionX?: PositionX,
    positionY?: PositionY
    rounded: Rounded,
}): EpClass {
    const _ = {
        positionX: options.positionX && PANEL_POSITION_X[options.positionX],
        positionY: options.positionY && PANEL_POSITION_Y[options.positionY],
        rounded: GLOBAL_ROUNDED[options.rounded],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getItemClass(options: {
    color: Color,
    size: Size,
    rounded: Rounded,
    selected?: boolean,
}) {
    const BASE_ITEM = options.selected
        ? [
            GLOBAL_COLOR.base[20].bg[options.color],
            GLOBAL_COLOR.base[100].text[options.color],
        ]
        : [
            GLOBAL_COLOR.hover[30].bg[options.color],
            GLOBAL_COLOR.base[100].text.subtitle,
            GLOBAL_COLOR.hover[100].text[options.color],
        ]
    const _ = {
        item: BASE_ITEM,
        size: ITEM_SIZE[options.size],
        rounded: GLOBAL_ROUNDED[options.rounded],
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