import { EpMerge, GLOBAL_COLOR, GLOBAL_FONTWEIGHT, GLOBAL_OPACITY, GLOBAL_TEXT_SIZE_PX, GLOBAL_TEXTTRANSFORM, GLOBAL_USERSELECT } from "@ep/global";
import { Color, EpClass, Opacity, Select, Size, Transform, Weight } from "./config";

export function getHostClass(options: {
    color: Color,
    size?: Size,
    weight?: Weight,
    transform?: Transform,
    select?: Select,
    opacity?: Opacity,
}): EpClass {
    const _ = {
        color: GLOBAL_COLOR.base[100].text[options.color],
        size: options.size && GLOBAL_TEXT_SIZE_PX[options.size],
        weight: options.weight && GLOBAL_FONTWEIGHT[options.weight],
        textTransform: options.transform && GLOBAL_TEXTTRANSFORM[options.transform],
        userSelect: options.select && GLOBAL_USERSELECT[options.select],
        opacity: options.opacity && GLOBAL_OPACITY[options.opacity],
    };
    console.log(_);
    return EpMerge.objectToStr(_).toClassNames();
}