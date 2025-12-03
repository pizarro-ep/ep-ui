import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>
type DisabledVariantClass = Record<Variant, Classes[]>

export const CHIP_VARIANTS: VariantClass = {
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
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
        border: ['border', GLOBAL_COLOR.base[100].border[color],],
    }],
    text: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
    }],
    plain: (color) => [{ text: GLOBAL_COLOR.base[75].text[color], }],
    tonal: (color) => [{
        bg: GLOBAL_COLOR.base[20].bg[color],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
};

export const CHIP_DISABLED_VARIANTS: VariantClass = {
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

export const CHIP_HOVER_VARIANTS: VariantClass = {
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

export const CHIP_PADDINGS: Record<Size, EpClass[]> = {
    'xs': ['px-1.5', 'py-0.5'],
    'sm': ['px-2', 'py-1'],
    'md': ['px-3', 'py-2'],
    'lg': ['px-4', 'py-3'],
    'xl': ['px-4.5', 'py-3.5'],
};