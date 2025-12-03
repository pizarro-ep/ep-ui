import { EpClass, Size, Variant } from "./config";

type VariantClass = Record<Variant, EpClass>

export const ICON_VARIANTS: VariantClass = {
    // 'none': '',
    'outlined': 'outlined',
    // 'round': 'round',
    'rounded': 'rounded',
    'sharp': 'sharp',
    // 'two-tone': 'two-tone',
}

export const ICON_SIZE: Record<Size, EpClass> = {
    "3xs": 'icon-size-3xs',
    "2xs": 'icon-size-2xs',
    xs: 'icon-size-xs',
    sm: 'icon-size-sm',
    md: 'icon-size-md',
    lg: 'icon-size-lg',
    xl: 'icon-size-xl',
    '2xl': 'icon-size-2xl',
    '3xl': 'icon-size-3xl',
    '4xl': 'icon-size-4xl',
    '5xl': 'icon-size-5xl',
    '6xl': 'icon-size-6xl',
    '7xl': 'icon-size-7xl',
    '8xl': 'icon-size-8xl',
    '9xl': 'icon-size-9xl',
}