import { Classes, Color, EpClass, Size, Variant } from "./config";

type ColorClass = Record<Color, EpClass[]>;
type VariantClass = Record<Variant, Classes>;

export const BODY_DIVIDE: EpClass[] = ['divide-y', 'divide-gray-200/50', 'dark:divide-gray-700/40'];
export const BODY_ROW_BG: EpClass[] = ['bg-ep-surface', 'dark:bg-ep-surface-dark'];

export const BODY_ROW_STRIPED_BG: ColorClass = {
    primary: ['odd:bg-ep-primary/10', 'even:bg-ep-primary/20', 'dark:odd:bg-ep-primary-dark/10', 'dark:even:bg-ep-primary-dark/20'],
    secondary: ['odd:bg-ep-secondary/10', 'even:bg-ep-secondary/20', 'dark:odd:bg-ep-secondary-dark/10', 'dark:even:bg-ep-secondary-dark/20'],
    success: ['odd:bg-ep-success/10', 'even:bg-ep-success/20', 'dark:odd:bg-ep-success-dark/10', 'dark:even:bg-ep-success-dark/20'],
    warning: ['odd:bg-ep-warning/10', 'even:bg-ep-warning/20', 'dark:odd:bg-ep-warning-dark/10', 'dark:even:bg-ep-warning-dark/20'],
    error: ['odd:bg-ep-error/10', 'even:bg-ep-error/20', 'dark:odd:bg-ep-error-dark/10', 'dark:even:bg-ep-error-dark/20'],
    info: ['odd:bg-ep-info/10', 'even:bg-ep-info/20', 'dark:odd:bg-ep-info-dark/10', 'dark:even:bg-ep-info-dark/20'],
    brand: ['odd:bg-ep-brand/10', 'even:bg-ep-brand/20', 'dark:odd:bg-ep-brand-dark/10', 'dark:even:bg-ep-brand-dark/20'],
    "brand-2": ['odd:bg-ep-brand-2/10', 'even:bg-ep-brand-2/20', 'dark:odd:bg-ep-brand-2-dark/10', 'dark:even:bg-ep-brand-2-dark/20'],
}
export const BODY_ROW_HOVER_BG: ColorClass = {
    primary: ['hover:bg-ep-primary/30', 'dark:hover:bg-ep-primary-dark/30'],
    secondary: ['hover:bg-ep-secondary/30', 'dark:hover:bg-ep-secondary-dark/30'],
    success: ['hover:bg-ep-success/30', 'dark:hover:bg-ep-success-dark/30'],
    warning: ['hover:bg-ep-warning/30', 'dark:hover:bg-ep-warning-dark/30'],
    error: ['hover:bg-ep-error/30', 'dark:hover:bg-ep-error-dark/30'],
    info: ['hover:bg-ep-info/30', 'dark:hover:bg-ep-info-dark/30'],
    brand: ['hover:bg-ep-brand/30', 'dark:hover:bg-ep-brand-dark/30'],
    "brand-2": ['hover:bg-ep-brand-2/30', 'dark:hover:bg-ep-brand-2-dark/30'],
}
export const BODY_ROW_CELL_BG: ColorClass = {
    primary: ['bg-ep-primary/20', 'dark:bg-ep-primary-dark/20'],
    secondary: ['bg-ep-secondary/20', 'dark:bg-ep-secondary-dark/20'],
    success: ['bg-ep-success/20', 'dark:bg-ep-success-dark/20'],
    warning: ['bg-ep-warning/20', 'dark:bg-ep-warning-dark/20'],
    error: ['bg-ep-error/20', 'dark:bg-ep-error-dark/20'],
    info: ['bg-ep-info/20', 'dark:bg-ep-info-dark/20'],
    brand: ['bg-ep-brand/20', 'dark:bg-ep-brand-dark/20'],
    "brand-2": ['bg-ep-brand-2/20', 'dark:bg-ep-brand-2-dark/20'],
}
export const BODY_CELL_BG: ColorClass = {
    primary: ['group-hover:bg-ep-primary/30', 'dark:group-hover:bg-ep-primary-dark/30'],
    secondary: ['group-hover:bg-ep-secondary/30', 'dark:group-hover:bg-ep-secondary-dark/30'],
    success: ['group-hover:bg-ep-success/30', 'dark:group-hover:bg-ep-success-dark/30'],
    warning: ['group-hover:bg-ep-warning/30', 'dark:group-hover:bg-ep-warning-dark/30'],
    error: ['group-hover:bg-ep-error/30', 'dark:group-hover:bg-ep-error-dark/30'],
    info: ['group-hover:bg-ep-info/30', 'dark:group-hover:bg-ep-info-dark/30'],
    brand: ['group-hover:bg-ep-brand/30', 'dark:group-hover:bg-ep-brand-dark/30'],
    "brand-2": ['group-hover:bg-ep-brand-2/30', 'dark:group-hover:bg-ep-brand-2-dark/30'],
}
export const BODY_CELL_STRIPED_BG: ColorClass = {
    primary: ['group-odd:bg-ep-primary/10', 'group-even:bg-ep-primary/20', 'dark:group-odd:bg-ep-primary-dark/10', 'dark:group-even:bg-ep-primary-dark/20'],
    secondary: ['group-odd:bg-ep-secondary/10', 'group-even:bg-ep-secondary/20', 'dark:group-odd:bg-ep-secondary-dark/10', 'dark:group-even:bg-ep-secondary-dark/20'],
    success: ['group-odd:bg-ep-success/10', 'group-even:bg-ep-success/20', 'dark:group-odd:bg-ep-success-dark/10', 'dark:group-even:bg-ep-success-dark/20'],
    warning: ['group-odd:bg-ep-warning/10', 'group-even:bg-ep-warning/20', 'dark:group-odd:bg-ep-warning-dark/10', 'dark:group-even:bg-ep-warning-dark/20'],
    error: ['group-odd:bg-ep-error/10', 'group-even:bg-ep-error/20', 'dark:group-odd:bg-ep-error-dark/10', 'dark:group-even:bg-ep-error-dark/20'],
    info: ['group-odd:bg-ep-info/10', 'group-even:bg-ep-info/20', 'dark:group-odd:bg-ep-info-dark/10', 'dark:group-even:bg-ep-info-dark/20'],
    brand: ['group-odd:bg-ep-brand/10', 'group-even:bg-ep-brand/20', 'dark:group-odd:bg-ep-brand-dark/10', 'dark:group-even:bg-ep-brand-dark/20'],
    "brand-2": ['group-odd:bg-ep-brand-2/10', 'group-even:bg-ep-brand-2/20', 'dark:group-odd:bg-ep-brand-2-dark/10', 'dark:group-even:bg-ep-brand-2-dark/20'],
}

export const CELL_VARIANT: VariantClass = {
    default: {},
    separated: { rounded: ['first:rounded-l-md', 'last:rounded-r-md'] }
}

export const TABLE_SIZES: Record<Size, EpClass[]> = {
    xs: ["px-2", "py-1.5"],
    sm: ["px-2", "py-2"],
    md: ["px-2.5", "py-3"],
    lg: ["px-3", "py-3.5"],
    xl: ["px-3", "py-4"],
}
export const TABLE_SIZES_2: Record<Size, EpClass[]> = {
    xs: ["px-2", "py-1"],
    sm: ["px-2", "py-1.5"],
    md: ["px-2.5", "py-2"],
    lg: ["px-3", "py-2.5"],
    xl: ["px-3", "py-3"],
}