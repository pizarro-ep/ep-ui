import { GLOBAL_COLOR } from "@ep/global";
import { Classes, Color, EpClass, Size, Variant } from "./config"

type ColorClass = Record<Color, EpClass[]>
type SizeClass = Record<Size, EpClass[] | EpClass>

type VariantClass = Record<Variant, (color: Color, size: Size) => Classes[]>

export const CONTAINER_VARIANT: VariantClass = {
    default: () => [{

    }],
    inset: (color) => [{
        bg: [
            GLOBAL_COLOR.base[20].bg[color],
        ],
        transition: ["transition-colors", "duration-200"],
        rounded: "rounded-full",
    }],
};

export const THUMB_VARIANT: VariantClass = {
    default: (color, size) => [{
        position: [
            ["top-1/2 -translate-y-1/2", "left-0", "right-0"],
            SWITCH_SIZE[size].translate[0]
        ],
        bg: [
            GLOBAL_COLOR.base[100].bg[color],
        ],
        transition: ["transition-all", "duration-200"],
        size: SWITCH_SIZE[size].size[0],
    }],
    inset: (color, size) => [{
        position: [
            ["top-1/2 -translate-y-1/2", "left-1", "right-1"],
            SWITCH_SIZE[size].translate[1],
        ],
        bg: [
            GLOBAL_COLOR.base[50].bg[color],
            GLOBAL_COLOR.peerchecked[100].bg[color],
        ],
        transition: ["transition-all", "duration-200"],
        size: SWITCH_SIZE[size].size[1],
    }],
};

export const SWITCH_SIZE = {
    xs: {
        w_h: [["w-9", "h-5.5"], "h-3"],
        size: [
            ["size-4", "peer-indeterminate:size-2.5"],
            ["size-3", "peer-checked:size-4", "peer-indeterminate:size-2.5"],
        ],
        translate: [
            ["peer-checked:translate-x-5", "peer-indeterminate:translate-x-3.5"],
            ["peer-checked:translate-x-3", "peer-indeterminate:translate-x-2"]
        ]
    },
    sm: {
        w_h: [["w-11", "h-6.5"], "h-3.5"],
        size: [
            ["size-5", "peer-indeterminate:size-3"],
            ["size-3.5", "peer-checked:size-5", "peer-indeterminate:size-3"],
        ],
        translate: [
            ["peer-checked:translate-x-6", "peer-indeterminate:translate-x-4"],
            ["peer-checked:translate-x-4", "peer-indeterminate:translate-x-3"]
        ]
    },
    md: {
        w_h: [["w-14", "h-8"], "h-4"],
        size: [
            ["size-6", "peer-indeterminate:size-3.5"],
            ["size-4", "peer-checked:size-6", "peer-indeterminate:size-3.5"],
        ],
        translate: [
            ["peer-checked:translate-x-8", "peer-indeterminate:translate-x-5"],
            ["peer-checked:translate-x-5.5", "peer-indeterminate:translate-x-4"]
        ]
    },
    lg: {
        w_h: [["w-16", "h-9"], "h-5"],
        size: [
            ["size-7", "peer-indeterminate:size-4.5"],
            ["size-4.5", "peer-checked:size-7", "peer-indeterminate:size-4"],
        ],
        translate: [
            ["peer-checked:translate-x-9", "peer-indeterminate:translate-x-5.5"],
            ["peer-checked:translate-x-7", "peer-indeterminate:translate-x-5"]
        ]
    },
    xl: {
        w_h: [["w-18", "h-10"], "h-6"],
        size: [
            ["size-8", "peer-indeterminate:size-5.5"],
            ["size-5", "peer-checked:size-8", "peer-indeterminate:size-4.5"],
        ],
        translate: [
            ["peer-checked:translate-x-10.5", "peer-indeterminate:translate-x-6.5"],
            ["peer-checked:translate-x-8", "peer-indeterminate:translate-x-6"]
        ]
    },
} 