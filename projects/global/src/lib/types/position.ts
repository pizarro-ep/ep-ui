export const TYPE_GLOBAL_POSITIONS_Y = [
    'top',
    'bottom',
] as const;

export const TYPE_GLOBAL_POSITIONS_X = [
    'left',
    'right',
] as const;

export const TYPE_GLOBAL_POSITIONS_X_ALL = [
    'center',
    ...TYPE_GLOBAL_POSITIONS_X,
] as const;

export const TYPE_GLOBAL_POSITIONS_Y_ALL = [
    'center',
    ...TYPE_GLOBAL_POSITIONS_Y,
] as const;

export const TYPE_GLOBAL_POSITIONS = [
    ...TYPE_GLOBAL_POSITIONS_Y,
    ...TYPE_GLOBAL_POSITIONS_X,
] as const;

export const TYPE_GLOBAL_POSITIONS_ALL = [
    ...TYPE_GLOBAL_POSITIONS_X_ALL,
    ...TYPE_GLOBAL_POSITIONS_Y_ALL,
] as const;