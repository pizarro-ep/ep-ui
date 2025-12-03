import { EpMerge } from "@ep/global";
import { EpClass, PositionX, PositionY } from "./config";
import { PANEL_POSITION_X, PANEL_POSITION_Y } from "./consts";

export function getPanelClass(options: { positionX?: PositionX, positionY?: PositionY }): EpClass {
    const _ = {
        position: [
            options.positionX && PANEL_POSITION_X[options.positionX],
            options.positionY && PANEL_POSITION_Y[options.positionY],
        ]
    }
    return EpMerge.objectToStr(_).toClassNames();
}