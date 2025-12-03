import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Icon, Variant } from "./config";

type VariantClass = Record<Variant, Classes>;
type VariantClassIcon = Record<Variant, (color: Icon) => Classes[]>;

export const LABEL_VARIANTS: VariantClass = {
    static: { text: 'text-ep-xl', },
    popup: { text: 'text-ep-3xl', },
}

export const SUBLABEL_VARIANTS: VariantClass = {
    static: { text: 'text-ep-base', },
    popup: { text: 'text-ep-lg', },
}

export const ICON_VARIANTS: VariantClassIcon = {
    static: (color) => [{
        size: ['size-5.5', 'mb-0.5'],
        text: [
            'text-ep-sm',
            GLOBAL_COLOR.base[100].text[color],
        ],
        border: [
            'border',
            GLOBAL_COLOR.base[100].border[color],
        ],
    }],
    popup: (color) => [{
        size: 'size-24',
        text: [
            'text-ep-7xl',
            GLOBAL_COLOR.base[100].text[color],
        ],
        border: [
            'border-2',
            GLOBAL_COLOR.base[100].border[color],
        ],
        animated: 'animate-pulse',
    }],
}