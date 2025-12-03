import { EpSelectItem } from "@ep/components";

type LabelCase = 'capitalize' | 'uppercase' | 'lowercase' | 'none';

/**
 * Convierte un array de strings a un array de EpSelectItem con formato opcional
 */
export function toSelectItems<T extends string | number>(
    arr: readonly T[],
    labelCase: LabelCase = 'capitalize'
): EpSelectItem[] {
    const format = (value: string | number): string => {
        const val = String(value);
        switch (labelCase) {
            case 'uppercase': return val.toUpperCase();
            case 'lowercase': return val.toLowerCase();
            case 'capitalize': return val.charAt(0).toUpperCase() + val.slice(1);
            default: return val;
        }
    };

    return arr.map(value => ({
        label: format(value),
        value: String(value),
    }));
}
