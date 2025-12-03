import { EpClass, PositionX, PositionY, Size } from "./config";

type PositionXClass = Record<PositionX, EpClass>
type PositionYClass = Record<PositionY, EpClass>

export const PANEL_POSITION_X: PositionXClass = {
    left: 'left-0',
    right: 'right-0',
}
export const PANEL_POSITION_Y: PositionYClass = {
    top: 'bottom-full',
    bottom: 'top-full',
}

export const ITEM_SIZE: Record<Size, EpClass[]> = {
    xs: ["px-2", "py-1.5"],
    sm: ["px-2", "py-2"],
    md: ["px-2.5", "py-2.5"],
    lg: ["px-3", "py-3"],
    xl: ["px-3", "py-3.5"],
}