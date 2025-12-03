import { ICON_VARIANTS, LABEL_VARIANTS, SUBLABEL_VARIANTS } from "./consts";
import { EpClass, Icon, Variant } from "./config";
import { EpMerge } from "@ep/global";

export function getModalIconClass(options: { variant: Variant, icon: Icon }): EpClass {
    const _ = { icon: ICON_VARIANTS[options.variant](options.icon) }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getModalLabelClass(options: { variant: Variant }): EpClass {
    const _ = { label: LABEL_VARIANTS[options.variant] }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getModalSubLabelClass(options: { variant: Variant }): EpClass {
    const _ = { sublabel: SUBLABEL_VARIANTS[options.variant] }
    return EpMerge.objectToStr(_).toClassNames();
}