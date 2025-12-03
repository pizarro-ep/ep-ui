import { Color, EpClass } from "./config";

// Helper para elegir background base según opciones
export function getBaseBg(
    options: { color?: Color; striped?: boolean },
    stripedMap: Record<Color, EpClass[]>,
    solidMap: Record<Color, EpClass[]>,
    defaultBg: EpClass[]
): EpClass[] {
    if (!options.color && !options.striped) return defaultBg;
    if (!options.color && options.striped) return stripedMap['secondary'];
    if (options.color && !options.striped) return solidMap[options.color];
    if (options.color && options.striped) return stripedMap[options.color];
    return [];
}