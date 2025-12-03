import { GLOBAL_GAP, GLOBAL_GAP_X, GLOBAL_GAP_Y, GLOBAL_HEIGHT_SIZE, GLOBAL_PADDING, GLOBAL_PADDING_X, GLOBAL_PADDING_Y, GLOBAL_WIDTH_SIZE } from "../consts";
import { IGaps, IHeights, IPaddings, IWidths } from "../interfaces";
import { Gaps, Paddings, Sizes3 } from "../types";

/**
 * Normaliza valores simples o complejos a un objeto consistente
 * @param value  El valor recibido (ej: number | string | objeto)
 * @param defaultKey  La clave por defecto a usar si es un valor simple
 */
export function EpNormalizeValue<TObj extends object, TValue>(
    value: TObj | TValue | null | undefined,
    defaultKey: keyof TObj
): TObj {
    if (!value) return {} as TObj;

    // Si es string o number → lo envuelve en el defaultKey
    if (typeof value === 'string' || typeof value === 'number') {
        return { [defaultKey]: value } as TObj;
    }

    // Si ya es objeto → lo deja como está
    return value as TObj;
}

export function GET_GLOBAL_WIDTHS(width: IWidths | Sizes3): string[] {
    const normalized = EpNormalizeValue<IWidths, Sizes3>(width, 'base');
    return Object.entries(normalized)
        .map(([key, value]) => {
            if (!value) return '';
            const bpKey = key as keyof typeof GLOBAL_WIDTH_SIZE;
            return GLOBAL_WIDTH_SIZE[bpKey][value as keyof typeof GLOBAL_WIDTH_SIZE[typeof bpKey]];
        })
        .filter(Boolean);
}

export function GET_GLOBAL_HEIGHTS(height: IHeights | Sizes3): string[] {
    const normalized = EpNormalizeValue<IWidths, Sizes3>(height, 'base');
    return Object.entries(normalized)
        .map(([key, value]) => {
            if (!value) return '';
            const bpKey = key as keyof typeof GLOBAL_HEIGHT_SIZE;
            return GLOBAL_HEIGHT_SIZE[bpKey][value as keyof typeof GLOBAL_HEIGHT_SIZE[typeof bpKey]];
        })
        .filter(Boolean);
}

export function GET_GLOBAL_PADDINGS(padding: IPaddings | Paddings): string[] {
    const normalized = EpNormalizeValue<IPaddings, Paddings>(padding, 'p');
    return Object.entries(normalized)
        .map(([key, value]) => {
            if (!value) return "";

            let breakpoint: string = "base";
            let paddingMap:
                | typeof GLOBAL_PADDING
                | typeof GLOBAL_PADDING_X
                | typeof GLOBAL_PADDING_Y;

            if (key.startsWith("p") && key.length === 1) {
                breakpoint = key === "p" ? "base" : key.slice(1).toLowerCase();
                paddingMap = GLOBAL_PADDING;
            } else if (key.startsWith("px")) {
                breakpoint = key === "px" ? "base" : key.slice(2).toLowerCase();
                paddingMap = GLOBAL_PADDING_X;
            } else if (key.startsWith("py")) {
                breakpoint = key === "py" ? "base" : key.slice(2).toLowerCase();
                paddingMap = GLOBAL_PADDING_Y;
            } else {
                return "";
            }

            const bpKey = breakpoint as keyof typeof paddingMap;
            return paddingMap[bpKey][value as keyof (typeof paddingMap)[typeof bpKey]];
        })
        .filter(Boolean);
}

export function GET_GLOBAL_GAPS(gap: IGaps | Gaps): string[] {
    const normalized = EpNormalizeValue<IGaps, Gaps>(gap, 'g');
    return Object.entries(normalized)
        .map(([key, value]) => {
            if (!value) return "";

            let breakpoint: string = "base";
            let paddingMap:
                | typeof GLOBAL_GAP
                | typeof GLOBAL_GAP_X
                | typeof GLOBAL_GAP_Y;

            if (key.startsWith("g") && key.length === 1) {
                breakpoint = key === "g" ? "base" : key.slice(1).toLowerCase();
                paddingMap = GLOBAL_GAP;
            } else if (key.startsWith("gx")) {
                breakpoint = key === "gx" ? "base" : key.slice(2).toLowerCase();
                paddingMap = GLOBAL_GAP_X;
            } else if (key.startsWith("gy")) {
                breakpoint = key === "gy" ? "base" : key.slice(2).toLowerCase();
                paddingMap = GLOBAL_GAP_Y;
            } else {
                return "";
            }

            const bpKey = breakpoint as keyof typeof paddingMap;
            return paddingMap[bpKey][value as keyof (typeof paddingMap)[typeof bpKey]];
        })
        .filter(Boolean);
}
