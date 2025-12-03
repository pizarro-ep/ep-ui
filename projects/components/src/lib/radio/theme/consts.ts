import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>

export const CONTAINER_VARIANT: VariantClass = {
    default: (color) => [],
    bordered: (color) => [{
        border: [
            'border',
            GLOBAL_COLOR.base[50].border[color],
            GLOBAL_COLOR.hover[75].border[color],
            GLOBAL_COLOR.haschecked[75].border[color],
            ['has-disabled:border-ep-secondary/50', 'dark:has-disabled:border-ep-secondary-dark/50']
        ],
    }],
    advanced: (color) => [],
};

export const INPUT_VARIANT: VariantClass = {
    default: (color) => [{
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
            GLOBAL_COLOR.hover[30].bg[color],
            GLOBAL_COLOR.checked[30].bg[color],
        ],
        border: [
            GLOBAL_COLOR.base[20].border[color],
            GLOBAL_COLOR.hover[30].border[color],
            GLOBAL_COLOR.checked[30].border[color],
        ],
        text: GLOBAL_COLOR.before[100].text[color],
    }],
    bordered: (color) => [{
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
            GLOBAL_COLOR.hover[30].bg[color],
            GLOBAL_COLOR.checked[30].bg[color],
        ],
        border: [
            GLOBAL_COLOR.base[20].border[color],
            GLOBAL_COLOR.hover[30].border[color],
            GLOBAL_COLOR.checked[30].border[color],
        ],
        text: GLOBAL_COLOR.before[100].text[color],
    }],
    advanced: (color) => [{ display: 'hidden' }],
};

export const LABEL_VARIANT: VariantClass = {
    default: (color) => [{
        text: ['text-ep-subtitle', 'dark:text-ep-subtitle-dark'],
    },],
    bordered: (color) => [{
        text: ['text-ep-subtitle', 'dark:text-ep-subtitle-dark'],
    },],
    advanced: (color) => [{
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
            GLOBAL_COLOR.hover[50].bg[color],
            GLOBAL_COLOR.peerchecked[50].bg[color],
            ['peer-disabled:bg-ep-secondary/20', 'dark:peer-disabled:bg-ep-secondary-dark/20'],
        ],
        text: GLOBAL_COLOR.base[100].text[color],
    },],
};

export const SIZE_CLASS: Record<Size, { padding: EpClass; size: EpClass[] }> = {
    'xs': { padding: 'p-2', size: ['size-4', 'checked:before:text-ep-xs'] },
    'sm': { padding: 'p-2.5', size: ['size-5', 'checked:before:text-ep-sm'] },
    'md': { padding: 'p-3', size: ['size-6', 'checked:before:text-ep-base'] },
    'lg': { padding: 'p-3.5', size: ['size-7', 'checked:before:text-ep-lg'] },
    'xl': { padding: 'p-4', size: ['size-8', 'checked:before:text-ep-xl'] },
}