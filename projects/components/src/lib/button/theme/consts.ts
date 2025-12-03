import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>

export const BUTTON_VARIANTS: VariantClass = {
    elevated: (color) => [{
        bg: [
            GLOBAL_COLOR.base[90].bg[color],
            GLOBAL_COLOR.hover[100].bg[color],
            ["disabled:bg-ep-secondary/50", "dark:disabled:bg-ep-secondary-dark/50"],
        ],
        text: [
            ['text-white', 'dark:text-white'],
            ["disabled:text-ep-secondary", "dark:disabled:text-ep-secondary"]
        ],
        shadow: 'shadow-ep-lg',
    }],
    flat: (color) => [{
        bg: [
            GLOBAL_COLOR.base[90].bg[color],
            GLOBAL_COLOR.hover[100].bg[color],
            ["disabled:bg-ep-secondary/50", "dark:disabled:bg-ep-secondary-dark/50"],
        ],
        text: [
            ['text-white', 'dark:text-white'],
            ["disabled:text-ep-secondary", "dark:disabled:text-ep-secondary"]
        ],
    }],
    outlined: (color) => [{
        text: GLOBAL_COLOR.base[100].text[color],
        bg: [
            GLOBAL_COLOR.hover[20].bg[color],
            'bg-transparent',
        ],
        border: [
            'border',
            GLOBAL_COLOR.base[100].border[color],
        ],
    }],
    text: (color) => [{
        text: GLOBAL_COLOR.base[100].text[color],
        bg: [
            'bg-transparent',
            GLOBAL_COLOR.hover[20].bg[color],
        ],
    }],
    plain: (color) => [{
        text: [
            GLOBAL_COLOR.base[75].text[color],
            GLOBAL_COLOR.hover[100].text[color],
        ],
    }],
    tonal: (color) => [{
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
            GLOBAL_COLOR.hover[30].bg[color],
        ],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
};

export const BUTTON_SIZES: Record<Size, { icon: EpClass, button: EpClass[] }> = {
    'xs': { icon: 'size-4', button: ['px-1.5', 'py-1'] },
    'sm': { icon: 'size-6', button: ['px-2', 'py-1.5'] },
    'md': { icon: 'size-8', button: ['px-3', 'py-2'] },
    'lg': { icon: 'size-10', button: ['px-3', 'py-2.5'] },
    'xl': { icon: 'size-12', button: ['px-4', 'py-3'] },
}