import { EpMerge, GLOBAL_COLOR } from '@ep/global';
import { Color, EpClass, Icon, Size, Variant } from "./config";
import { ICON_SIZE, ICON_VARIANTS } from "./consts";

export function getIconContainerClass(options: { icon?: Icon, size?: Size, color?: Color }): EpClass {
    const _ = {
        size: options.size && ICON_SIZE[options.size],
        color: options.color && GLOBAL_COLOR.base[100].text[options.color],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getIconClass(options: { variant: Variant, icon?: Icon }): EpClass {
    const TYPE_ICON = `material-symbols-${ICON_VARIANTS[options.variant]}`;
    const _ = {
        style: options.icon && TYPE_ICON,
    };
    return EpMerge.objectToStr(_).toClassNames();
}