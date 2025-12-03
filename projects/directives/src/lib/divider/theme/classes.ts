import { EpMerge, GLOBAL_COLOR, GLOBAL_OPACITY } from "@ep/global";
import { Variant, Color, Thickness, Opacity } from "./config";
import { DIVIDER_VARIANT } from "./consts";

export function getHostClass(options: {
    variant: Variant,
    color: Color,
    thickness: Thickness,
    opacity?: Opacity,
}) {
    const OPACITY = (typeof options.opacity !== 'undefined') && GLOBAL_OPACITY[options.opacity];

    const _ = {
        divider: DIVIDER_VARIANT[options.variant](options.thickness),
        color: GLOBAL_COLOR.base[90].bg[options.color],
        opacity: OPACITY,
    }
    return EpMerge.objectToStr(_).toClassNames();
}