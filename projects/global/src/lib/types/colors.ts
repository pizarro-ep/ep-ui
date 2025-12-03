export const TYPE_GLOBAL_COLORS_1 = [
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "info",
] as const;

export const TYPE_GLOBAL_COLORS_2 = [
    "title",
    "subtitle",
] as const;

export const TYPE_GLOBAL_COLORS_3 = [
    "brand",
    "brand-2",
] as const;

export const TYPE_GLOBAL_COLORS_4 = [
    "body",
    "container",
    "surface",
] as const;

export const TYPE_GLOBAL_COLORS_ALL = [
    ...TYPE_GLOBAL_COLORS_1,
    ...TYPE_GLOBAL_COLORS_2,
    ...TYPE_GLOBAL_COLORS_3,
    ...TYPE_GLOBAL_COLORS_4,
] as const;
