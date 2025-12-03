import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>

export const CARD_VARIANTS: VariantClass = {
    elevated: (color) => [{
        bg: GLOBAL_COLOR.base[90].bg[color],
        text: ['text-white', 'dark:text-white'],
        shadow: 'shadow-ep-lg',
    }],
    flat: (color) => [{
        bg: GLOBAL_COLOR.base[90].bg[color],
        text: ['text-white', 'dark:text-white'],
    }],
    outlined: (color) => [{
        text: GLOBAL_COLOR.base[100].text[color],
        bg: 'bg-transparent',
        border: [
            GLOBAL_COLOR.base[75].border[color],
            'border',
        ],
    }],
    text: (color) => [{
        text: GLOBAL_COLOR.base[100].text[color],
        bg: 'bg-transparent',
    }],
    plain: (color) => [{
        text: GLOBAL_COLOR.base[75].text[color],
    }],
    tonal: (color) => [{
        bg: GLOBAL_COLOR.base[20].bg[color],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
};

export const CARD_DISABLED_VARIANTS: VariantClass = {
    elevated: () => [{
        bg: GLOBAL_COLOR.base[50].bg.secondary,
        text: [GLOBAL_COLOR.base[100].text.secondary],
        shadow: 'shadow-ep-lg',
    }],
    flat: () => [{
        bg: GLOBAL_COLOR.base[50].bg.secondary,
        text: [GLOBAL_COLOR.base[100].text.secondary],
    }],
    outlined: (color) => [{
        text: GLOBAL_COLOR.base[100].text[color],
        bg: 'bg-transparent',
        border: [
            GLOBAL_COLOR.base[75].border[color],
            'border',
        ],
    }],
    text: () => [{
        text:
            GLOBAL_COLOR.hover[100].text.secondary,
        bg: 'bg-transparent',
    }],
    plain: () => [{
        text: GLOBAL_COLOR.base[75].text.secondary,
    }],
    tonal: () => [{
        bg: GLOBAL_COLOR.base[20].bg.secondary,
        text: GLOBAL_COLOR.base[100].text.secondary,
    }],
};

export const CARD_HOVER_VARIANTS: VariantClass = {
    elevated: (color) => [{
        bg: GLOBAL_COLOR.hover[100].bg[color],
    }],
    flat: (color) => [{
        bg: GLOBAL_COLOR.hover[100].bg[color],
    }],
    outlined: (color) => [{
        bg: GLOBAL_COLOR.hover[10].bg[color],
        border: GLOBAL_COLOR.hover[100].border[color],
    }],
    text: (color) => [{
        bg: GLOBAL_COLOR.hover[10].bg[color],
    }],
    plain: (color) => [{
        text: GLOBAL_COLOR.hover[100].text[color],
    }],
    tonal: (color) => [{
        bg: GLOBAL_COLOR.hover[30].bg[color]
    }],
};

export const CARD_SIZES: Record<Size, EpClass[]> = {
    'xs': ['gap-2', 'p-2'],
    'sm': ['gap-2.5', 'p-2.5'],
    'md': ['gap-3', 'p-3'],
    'lg': ['gap-3.5', 'p-3.5'],
    'xl': ['gap-4', 'p-4'],
}