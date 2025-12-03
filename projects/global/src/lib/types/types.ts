export const TYPE_GLOBAL_TYPES_1 = [
    'text',
    'email',
    'number',
    'password',
] as const;

export const TYPE_GLOBAL_TYPES_2 = [
    'button',
    'icon',
] as const;

export const TYPE_GLOBAL_TYPES_3 = [
    ...TYPE_GLOBAL_TYPES_2,
    'submit',
] as const;

export const TYPE_GLOBAL_TYPES_4 = [
    'alert',
    'confirm',
    'prompt',
] as const;

export const TYPE_GLOBAL_TYPES_5 = [
    'success',
    'warning',
    'error',
    'info',
] as const;