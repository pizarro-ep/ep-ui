import { EpMerge, GLOBAL_ROTATE, GLOBAL_ROTATE_X, GLOBAL_ROTATE_Y, GLOBAL_ROTATE_Z } from "@ep/global";
import { Angle, EpClass, Phase } from "./config";

export function getHostClass(options: {
    phase: Phase,
    from?: Angle,
    fromX?: Angle,
    fromY?: Angle,
    fromZ?: Angle,
    to?: Angle,
    toX?: Angle,
    toY?: Angle,
    toZ?: Angle,
}): EpClass {
    const BASE_ANGLE = options.phase === "first"
        ? [
            options.from && GLOBAL_ROTATE[options.from],
            options.fromX && GLOBAL_ROTATE_X[options.fromX],
            options.fromY && GLOBAL_ROTATE_Y[options.fromY],
            options.fromZ && GLOBAL_ROTATE_Z[options.fromZ],
        ] : [
            options.to && GLOBAL_ROTATE[options.to],
            options.toX && GLOBAL_ROTATE_X[options.toX],
            options.toY && GLOBAL_ROTATE_Y[options.toY],
            options.toZ && GLOBAL_ROTATE_Z[options.toZ],
        ]
    const _ = {
        angle: BASE_ANGLE,
    };
    return EpMerge.objectToStr(_).toClassNames();
}