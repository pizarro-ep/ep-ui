import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, (color: Color) => Classes[]>;
type DisabledVariantClass = Record<Variant, Classes>;

export const LIST_HEIGHT: Record<0 | 1, EpClass> = {
    0: 'max-h-0',
    1: 'max-h-[1000px]',
}

export const ITEM_VARIANTS: VariantClass = {
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
        border: [
            'border',
            GLOBAL_COLOR.base[100].border[color],
        ],
    }],
    text: (color) => [{
        bg: 'bg-transparent',
        text: GLOBAL_COLOR.base[100].text[color],
    }],
    plain: (color) => [{
        text: GLOBAL_COLOR.base[75].text[color],
    }],
    tonal: (color) => [{
        bg: GLOBAL_COLOR.base[20].bg[color],
        text: GLOBAL_COLOR.base[100].text[color],
    }],
};
export const ITEM_HOVER_VARIANTS: VariantClass = {
    elevated: (color) => [{ bg: GLOBAL_COLOR.hover[100].bg[color], }],
    flat: (color) => [{ bg: GLOBAL_COLOR.hover[100].bg[color], }],
    outlined: (color) => [{ bg: GLOBAL_COLOR.hover[20].bg[color], }],
    text: (color) => [{ bg: GLOBAL_COLOR.hover[20].bg[color], }],
    plain: (color) => [{ text: GLOBAL_COLOR.hover[100].text[color], }],
    tonal: (color) => [{ bg: GLOBAL_COLOR.hover[30].bg[color], }],
};

const ITEM_DISABLED_COMMON: Classes = {
    text: ['text-ep-secondary/75', 'dark:text-ep-secondary-dark/75'],
    opacity: 'opacity-50',
    pointer: 'pointer-events-none',
};

export const ITEM_DISABLED_VARIANTS: DisabledVariantClass = {
    elevated: {
        bg: ['bg-ep-secondary/50', 'dark:bg-ep-secondary-dark/50'],
        shadow: 'shadow-ep-lg',
        ...ITEM_DISABLED_COMMON,
    },
    flat: {
        bg: ['bg-ep-secondary/50', 'dark:bg-ep-secondary-dark/50'],
        ...ITEM_DISABLED_COMMON,
    },
    outlined: {
        bg: 'bg-transparent',
        border: [
            'border',
            ['border-ep-secondary/50', 'dark:border-ep-secondary-dark/50'],
        ],
        ...ITEM_DISABLED_COMMON,
    },
    text: {
        bg: 'bg-transparent',
        ...ITEM_DISABLED_COMMON,
    },
    plain: {
        ...ITEM_DISABLED_COMMON,
    },
    tonal: {
        bg: ['bg-ep-secondary/20', 'dark:bg-ep-secondary-dark/20'],
        ...ITEM_DISABLED_COMMON,
    },
};

export const ITEM_PADDINGS: Record<Size, EpClass[]> = {
    'xs': ['py-1', 'px-1.5'],
    'sm': ['py-1.5', 'px-2'],
    'md': ['py-2', 'px-2.5'],
    'lg': ['py-2.5', 'px-3'],
    'xl': ['py-3', 'px-3.5'],
};
export const LIST_ITEM_SPACES: Record<Size, EpClass> = {
    'xs': 'gap-y-0.5',
    'sm': 'gap-y-1',
    'md': 'gap-y-1.5',
    'lg': 'gap-y-2',
    'xl': 'gap-y-2.5',
};

export const ITEM_SELECTED_CLASS: EpClass[] = ['brightness-75', 'dark:brightness-125']