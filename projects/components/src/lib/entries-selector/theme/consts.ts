import { EpClass, Size } from "./config";

type SizeClass = Record<Size, EpClass>;

export const SIZE_CLASS: SizeClass = {
    'xs': 'max-w-14',
    'sm': 'max-w-16',
    'md': 'max-w-18',
    'lg': 'max-w-20',
    'xl': 'max-w-22',
}