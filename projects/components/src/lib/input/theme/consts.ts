import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>

export const CONTAINER_VARIANTS: VariantClass = {
    filled: (color) => [{
        border: 'border-0',
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
            GLOBAL_COLOR.grouphover[30].bg[color],
            GLOBAL_COLOR.groupfocuswithin[30].bg[color],
        ],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
    outlined: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
        border: [
            'border',
            GLOBAL_COLOR.base[50].border[color],
            GLOBAL_COLOR.grouphover[75].border[color],
            GLOBAL_COLOR.groupfocuswithin[75].border[color],
        ],
    }],
    underlined: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
        border: [
            'border-b-2',
            GLOBAL_COLOR.base[50].border[color],
            GLOBAL_COLOR.grouphover[75].border[color],
            GLOBAL_COLOR.groupfocuswithin[75].border[color],
        ],
    }],
};

export const CONTAINER_DISABLED_VARIANTS: VariantClass = {
    filled: (color) => [{
        border: 'border-0',
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
        ],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
    outlined: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
        border: [
            'border',
            GLOBAL_COLOR.base[20].border[color],
            GLOBAL_COLOR.grouphover[50].border[color],
            GLOBAL_COLOR.groupfocuswithin[50].border[color],
        ],
    }],
    underlined: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
        border: [
            'border-b-2',
            GLOBAL_COLOR.base[20].border[color],
            GLOBAL_COLOR.grouphover[50].border[color],
            GLOBAL_COLOR.groupfocuswithin[50].border[color],
        ],
    }],
};

export const NUMBER_ICON_VARIANTS: VariantClass = {
    filled: (color) => [{
        bg: [
            GLOBAL_COLOR.base[10].bg[color],
            GLOBAL_COLOR.hover[30].bg[color],
        ],
    }],
    outlined: (color) => [{
        bg: [
            'bg-transparent',
            GLOBAL_COLOR.hover[10].bg[color],
        ],
        border: [
            GLOBAL_COLOR.base[50].border[color],
            GLOBAL_COLOR.hover[75].border[color],
        ],
    }],
    underlined: (color) => [{
        bg: [
            'bg-transparent',
            GLOBAL_COLOR.hover[10].bg[color],
        ],
        text: GLOBAL_COLOR.base[100].text[color],
        border: [
            GLOBAL_COLOR.base[50].border[color],
            GLOBAL_COLOR.hover[75].border[color],
        ],
    }],
};

export const LABEL_SIZE: Record<Size, Classes> = {
    xs: {
        text: ['text-ep-2xs', 'peer-focus:text-ep-2xs', 'peer-placeholder-shown:text-ep-xs'],
        translate: ["-translate-y-3 peer-focus:-translate-y-3"],
    },
    sm: {
        text: ['text-ep-2xs', 'peer-focus:text-ep-2xs', 'peer-placeholder-shown:text-ep-sm'],
        translate: ["-translate-y-3.5 peer-focus:-translate-y-3.5"],
    },
    md: {
        text: ['text-ep-xs', 'peer-focus:text-ep-xs', 'peer-placeholder-shown:text-ep-base'],
        translate: ["-translate-y-4 peer-focus:-translate-y-4"],
    },
    lg: {
        text: ['text-ep-sm', 'peer-focus:text-ep-sm', 'peer-placeholder-shown:text-ep-lg'],
        translate: ["-translate-y-5 peer-focus:-translate-y-5"],
    },
    xl: {
        text: ['text-ep-sm', 'peer-focus:text-ep-sm', 'peer-placeholder-shown:text-ep-xl'],
        translate: ["-translate-y-5.5 peer-focus:-translate-y-5.5"],
    },
}

export const INPUT_LABEL_SIZE: Record<Size, { paddingX: EpClass[]; paddingY: EpClass, heigth: EpClass }> = {
    xs: { paddingX: ['pl-2', 'pr-2',], paddingY: 'py-2', heigth: 'h-2.5' },
    sm: { paddingX: ['pl-2', 'pr-2',], paddingY: 'py-2', heigth: 'h-3' },
    md: { paddingX: ['pl-3', 'pr-3',], paddingY: 'py-2.5', heigth: 'h-3.5' },
    lg: { paddingX: ['pl-3.5', 'pr-3.5',], paddingY: 'py-3', heigth: 'h-4' },
    xl: { paddingX: ['pl-3.5', 'pr-3.5',], paddingY: 'py-3', heigth: 'h-4.5' },
};

export const CONTAINER_SIZE: Record<Size, EpClass> = {
    'xs': 'h-8',
    'sm': 'h-10',
    'md': 'h-12',
    'lg': 'h-14',
    'xl': 'h-16',
}