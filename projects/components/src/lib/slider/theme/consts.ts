import { Classes, Color, EpClass, Size } from "./config";

type ColorClass = Record<Color, EpClass[]>
type SizeClass = Record<Size, EpClass[] | EpClass>

export const INPUT_COLOR: ColorClass = {
    primary: ['accent-ep-primary', 'dark:accent-ep-primary-dark', '[&::-webkit-slider-thumb]:bg-ep-primary', 'dark:[&::-webkit-slider-thumb]:bg-ep-primary-dark', '[&::-moz-range-thumb]:bg-ep-primary', 'dark:[&::-moz-range-thumb]:bg-ep-primary-dark'],
    secondary: ['accent-ep-secondary', 'dark:accent-ep-secondary-dark', '[&::-webkit-slider-thumb]:bg-ep-secondary', 'dark:[&::-webkit-slider-thumb]:bg-ep-secondary-dark', '[&::-moz-range-thumb]:bg-ep-secondary', 'dark:[&::-moz-range-thumb]:bg-ep-secondary-dark'],
    success: ['accent-ep-success', 'dark:accent-ep-success-dark', '[&::-webkit-slider-thumb]:bg-ep-success', 'dark:[&::-webkit-slider-thumb]:bg-ep-success-dark', '[&::-moz-range-thumb]:bg-ep-success', 'dark:[&::-moz-range-thumb]:bg-ep-success-dark'],
    warning: ['accent-ep-warning', 'dark:accent-ep-warning-dark', '[&::-webkit-slider-thumb]:bg-ep-warning', 'dark:[&::-webkit-slider-thumb]:bg-ep-warning-dark', '[&::-moz-range-thumb]:bg-ep-warning', 'dark:[&::-moz-range-thumb]:bg-ep-warning-dark'],
    error: ['accent-ep-error', 'dark:accent-ep-error-dark', '[&::-webkit-slider-thumb]:bg-ep-error', 'dark:[&::-webkit-slider-thumb]:bg-ep-error-dark', '[&::-moz-range-thumb]:bg-ep-error', 'dark:[&::-moz-range-thumb]:bg-ep-error-dark'],
    info: ['accent-ep-info', 'dark:accent-ep-info-dark', '[&::-webkit-slider-thumb]:bg-ep-info', 'dark:[&::-webkit-slider-thumb]:bg-ep-info-dark', '[&::-moz-range-thumb]:bg-ep-info', 'dark:[&::-moz-range-thumb]:bg-ep-info-dark'],
    brand: ['accent-ep-brand', 'dark:accent-ep-brand-dark', '[&::-webkit-slider-thumb]:bg-ep-brand', 'dark:[&::-webkit-slider-thumb]:bg-ep-brand-dark', '[&::-moz-range-thumb]:bg-ep-brand', 'dark:[&::-moz-range-thumb]:bg-ep-brand-dark'],
    "brand-2": ['accent-ep-brand-2', 'dark:accent-ep-brand-2-dark', '[&::-webkit-slider-thumb]:bg-ep-brand-2', 'dark:[&::-webkit-slider-thumb]:bg-ep-brand-2-dark', '[&::-moz-range-thumb]:bg-ep-brand-2', 'dark:[&::-moz-range-thumb]:bg-ep-brand-2-dark'],
}
export const INPUT_SIZE: SizeClass = {
    'xs': ['[&::-webkit-slider-thumb]:size-3', '[&::-moz-range-thumb]:size-3',],
    'sm': ['[&::-webkit-slider-thumb]:size-4', '[&::-moz-range-thumb]:size-4',],
    'md': ['[&::-webkit-slider-thumb]:size-5', '[&::-moz-range-thumb]:size-5',],
    'lg': ['[&::-webkit-slider-thumb]:size-6', '[&::-moz-range-thumb]:size-6',],
    'xl': ['[&::-webkit-slider-thumb]:size-7', '[&::-moz-range-thumb]:size-7',],
};

export const TRACK_UNDER_WIDTH: EpClass = 'w-full';
export const SLIDER_SIZES: { [key in Size]: { container: EpClass, under: EpClass, over: EpClass } } = {
    'xs': { container: 'h-3', under: 'h-1', over: 'h-1.5' },
    'sm': { container: 'h-4', under: 'h-2', over: 'h-2.5' },
    'md': { container: 'h-5', under: 'h-3', over: 'h-3.5' },
    'lg': { container: 'h-6', under: 'h-4', over: 'h-4.5' },
    'xl': { container: 'h-7', under: 'h-5', over: 'h-5' },
}
export const TRACK_ROUNDED: SizeClass = {
    'xs': 'rounded-xl',
    'sm': 'rounded-xl',
    'md': 'rounded-2xl',
    'lg': 'rounded-2xl',
    'xl': 'rounded-3xl',
}
export const INPUT_READONLY: Classes = {
    bg: ['[&::-moz-range-thumb]:brightness-95', '[&::-moz-range-thumb]:brightness-105'],
    pointer: 'pointer-events-none'
}
export const LABEL_COLOR: EpClass[] = ['text-ep-subtitle', 'dark:text-ep-subtitle-dark'];
export const LABEL_DISABLED_COLOR: EpClass[] = ['text-ep-secondary', 'dark:text-ep-secondary-dark'];
export const COMMON_DISABLED: Classes = {
    opacity: 'opacity-50',
    pointer: 'pointer-events-none'
}
export const COMMON_READONLY: Classes = {
    opacity: 'opacity-75',
    pointer: 'pointer-events-none'
}