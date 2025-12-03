import { GLOBAL_HEIGHT_SIZE_PX, GLOBAL_WIDTH_SIZE_PX } from "@ep/global";
import { Classes, Thickness, Variant } from "./config";

type VariantClass = Record<Variant, (t: Thickness) => Classes[]>

export const DIVIDER_VARIANT: VariantClass = {
    horizontal: (thickness) => [{
        width: 'w-full',
        size: GLOBAL_HEIGHT_SIZE_PX["base"][thickness]
    }],
    vertical: (thickness) => [{
        height: 'h-full',
        size: GLOBAL_WIDTH_SIZE_PX["base"][thickness]
    }],
    inset: (thickness) => [{
        width: 'w-full',
        space: 'ml-4',
        size: GLOBAL_HEIGHT_SIZE_PX["base"][thickness]
    }],
}