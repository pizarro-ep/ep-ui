export class EpMerge<T = unknown> {
    constructor(private data: T) { }

    /** Crea una nueva instancia desde un valor */
    static from<U>(data: U): EpMerge<U> {
        return new EpMerge<U>(data);
    }

    /** Convierte un objeto en string concatenando todos los valores tipo string */
    static objectToStr(obj: Record<string, any> | object): EpMerge<string> {
        const extractStrings = (o: any): string[] => {
            if (typeof o === 'string') return [o];
            if (Array.isArray(o)) return o.flatMap(extractStrings);
            if (o && typeof o === 'object') return Object.values(o).flatMap(extractStrings);
            return [];
        };
        return new EpMerge(extractStrings(obj).join(' '));
    }

    /** Retorna las clases como un string normalizado */
    toClassNames(extra?: string): string {
        const base = typeof this.data === 'string' ? this.data : '';
        // Combinar base y extra
        const allClasses = `${base} ${extra ?? ''}`.trim();
        // Crear un Set para eliminar duplicados
        const uniqueClasses = Array.from(new Set(allClasses.split(/\s+/)));
        return uniqueClasses.length ? ` ${uniqueClasses.join(' ')}` : '';
    }


    /** Retorna las clases como lista (sin duplicados) */
    toClassList(extra?: string): string[] {
        const str = this.toClassNames(extra);
        return Array.from(new Set(str.split(/\s+/).filter(Boolean)));
    }
}
