import { EpClass, PositionX, PositionY } from "./config";

type PositionXClass = Record<PositionX, EpClass>
type PositionYClass = Record<PositionY, EpClass>

export const PANEL_POSITION_X: PositionXClass = {
    left: 'left-0',
    right: 'right-0',
}
export const PANEL_POSITION_Y: PositionYClass = {
    top: 'bottom-full mt-2',
    bottom: 'top-full mt-2',
}