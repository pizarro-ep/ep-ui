/* ────────────────────────────────────────────── */
/* 🔧 UTILIDADES DE FORMATO E INDENTACIÓN         */
/* ────────────────────────────────────────────── */

/**
 * Quita la indentación mínima común de un bloque de texto.
 * También elimina líneas vacías al inicio y al final.
 */
export function EpDedent(str: string) {
    const lines = str.split('\n');

    // Eliminar líneas vacías iniciales y finales
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

    if (lines.length === 0) return '';

    // Calcular indentación mínima
    const indents = lines
        .filter(l => l.trim())
        .map(l => l.match(/^(\s*)/)?.[1].length ?? 0);

    const minIndent = Math.min(...indents);
    return lines.map(l => l.slice(minIndent)).join('\n');
}

/** Genera una cantidad de espacios equivalente al padding solicitado. */
export const EpPad = (n: number) => ' '.repeat(n);

/** Genera una función para limpiar valores indefinidos o nulos */
export function EpClean(obj: any): any {
    if (Array.isArray(obj)) {
        const arr = obj
            .map(v => EpClean(v))
            .filter(v => v !== undefined && v !== null);
        return arr.length ? arr : undefined;
    }

    if (typeof obj === 'object' && obj !== null) {
        const out: any = {};
        Object.entries(obj).forEach(([k, v]) => {
            const cleaned = EpClean(v);
            if (cleaned !== undefined && cleaned !== null && cleaned !== '') {
                out[k] = cleaned;
            }
        });
        return Object.keys(out).length ? out : undefined;
    }

    return obj;
}


/**
 * Indenta un bloque de texto automáticamente según su estructura ({}, []).
 * Soporta anidamiento y niveles personalizados.
 */
export function EpIndentBlock(block: string, pad = 4, baseLevel = 0): string {
    const lines = block.split('\n');
    let level = baseLevel;
    const result: string[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            result.push('');
            continue;
        }

        // Si la línea cierra un bloque, reducir antes de aplicar indentación
        if (/^[\}\]]/.test(trimmed)) level = Math.max(baseLevel, level - 1);

        const prefix = EpPad(pad * level);
        result.push(prefix + trimmed);

        // Si abre un bloque, aumentar nivel después
        if (/[\{\[]\s*$/.test(trimmed)) level++;
    }

    return result.join('\n');
}


/* ────────────────────────────────────────────── */
/* 🧱 CONSTRUCTORES DE CODE TOKES                 */
/* ────────────────────────────────────────────── */

/** Representa los elementos de etiquetas html */
interface CodeTemplateToken {
    type:
    | "tag-delimiter"
    | "tag-name"
    | "attr-name"
    | "attr-equal"
    | "attr-value"
    | "whitespace"
    | "comment"
    | "text";
    value: string;
}

/** Representa elementos principales de un script / Angular */
interface CodeScriptToken {
    type:
    | "keyword"
    | "identifier"
    | "property"
    | "function-name"
    | "operator"
    | "punctuation"
    | "string"
    | "number"
    | "boolean"
    | "comment"
    | "whitespace";
    value: string;
}

/**
 * Tokeniza una plantilla HTML y la convierte en una lista de tokens
 * clasificados para aplicar resaltado de sintaxis.
 *
 * La función identifica correctamente:
 * - Comentarios: <!-- ... -->
 * - Delimitadores de etiquetas: <, </, >, />
 * - Nombres de etiquetas
 * - Nombres de atributos
 * - Valores de atributos (con o sin comillas)
 * - Texto fuera de una etiqueta
 * - Espacios en blanco
 *
 * @param template Cadena HTML o Angular template a tokenizar.
 * @returns Lista de tokens clasificados como CodeTemplateToken[].
 *
 * @example
 * EpTokenizeTemplate(`<div class="box">Hola</div>`);
 *
 * // Resultado:
 * [
 *   { type: "tag-delimiter", value: "<" },
 *   { type: "tag-name", value: "div" },
 *   { type: "attr-name", value: "class" },
 *   { type: "attr-equal", value: "=" },
 *   { type: "attr-value", value: "\"box\"" },
 *   { type: "tag-delimiter", value: ">" },
 *   { type: "text", value: "Hola" },
 *   { type: "tag-delimiter", value: "</" },
 *   { type: "tag-name", value: "div" },
 *   { type: "tag-delimiter", value: ">" }
 * ]
 *
 * @remarks
 * Esta función NO interpreta Angular bindings. Solo tokeniza el texto.
 * Ejemplo: [value]="user.name" se detecta como nombre de atributo y valor.
 */

export function EpTokenizeTemplate(template: string): CodeTemplateToken[] {
    const tokens: CodeTemplateToken[] = [];
    let i = 0;
    let insideTag = false;
    let expectingTagName = false;

    while (i < template.length) {
        const ch = template[i];

        // --- COMMENT <!-- ... --> ---
        if (template.startsWith("<!--", i)) {
            let value = "";
            i += 4; // saltar <!--

            while (i < template.length && !template.startsWith("-->", i)) {
                value += template[i++];
            }

            if (template.startsWith("-->", i)) i += 3;

            tokens.push({ type: "comment", value: `<!--${value}-->` });
            continue;
        }

        // --- WHITESPACE ---
        if (/\s/.test(ch)) {
            let value = "";
            while (i < template.length && /\s/.test(template[i])) value += template[i++];
            tokens.push({ type: "whitespace", value });
            continue;
        }

        // --- TAG OPEN ---
        if (template.startsWith("</", i)) {
            tokens.push({ type: "tag-delimiter", value: "</" });
            insideTag = true;
            expectingTagName = true;
            i += 2;
            continue;
        }

        if (ch === "<") {
            tokens.push({ type: "tag-delimiter", value: "<" });
            insideTag = true;
            expectingTagName = true;
            i++;
            continue;
        }

        // --- SELF CLOSING TAG: /> ---
        if (template.startsWith("/>", i)) {
            tokens.push({ type: "tag-delimiter", value: "/>" });
            insideTag = false;
            expectingTagName = false;
            i += 2;
            continue;
        }

        // --- TAG CLOSE ---
        if (ch === ">") {
            tokens.push({ type: "tag-delimiter", value: ">" });
            insideTag = false;
            expectingTagName = false;
            i++;
            continue;
        }

        // --- EQUAL SIGN ---
        if (ch === "=") {
            tokens.push({ type: "attr-equal", value: "=" });
            i++;
            continue;
        }

        // --- ATTRIBUTE VALUE (QUOTED) ---
        if ((ch === '"' || ch === "'") && tokens.at(-1)?.type === "attr-equal") {
            const quote = ch;
            let value = ch;
            i++;

            while (i < template.length && template[i] !== quote) {
                value += template[i++];
            }

            if (template[i] === quote) value += template[i++];

            tokens.push({ type: "attr-value", value });
            continue;
        }

        // --- ATTRIBUTE VALUE (UNQUOTED) ---
        if (tokens.at(-1)?.type === "attr-equal") {
            let value = "";
            while (i < template.length && !/[\s>]/.test(template[i])) value += template[i++];
            tokens.push({ type: "attr-value", value });
            continue;
        }

        // --- IDENTIFIER TAG/ATTR ---
        if (/[\w\[\]\(\)\.\:\*\#\$-]/.test(ch)) {
            let value = "";
            while (i < template.length && /[\w\[\]\(\)\.\:\*\#\$-]/.test(template[i])) value += template[i++];

            if (expectingTagName) {
                tokens.push({ type: "tag-name", value });
                expectingTagName = false;
            } else if (insideTag) {
                tokens.push({ type: "attr-name", value });
            } else {
                tokens.push({ type: "text", value });
            }
            continue;
        }

        // --- TEXT OUTSIDE TAG ---
        let text = "";
        while (i < template.length && !/[<>]/.test(template[i])) text += template[i++];
        tokens.push({ type: "text", value: text });
    }

    return tokens;
}

/**
 * Tokeniza código TypeScript/JavaScript y lo convierte en una lista de tokens
 * clasificados para resaltado de sintaxis.
 *
 * Reconoce correctamente:
 * - Palabras clave (import, class, const, return…)
 * - Identificadores
 * - Propiedades (this.x, claves de objeto, propiedades de clase)
 * - Nombres de funciones detectados por el paréntesis siguiente
 * - Strings ('', "", ``)
 * - Números
 * - Booleanos
 * - Comentarios
 * - Operadores y signos de puntuación
    * - Espacios en blanco
        *
 * @param script Código fuente TypeScript o JavaScript.
 * @returns Lista de tokens clasificados como CodeScriptToken[].
 *
 * @example
    * EpTokenizeScript(`class Demo { value = 10; getValue() { return this.value; } }`);
 *
 * // Resultado:
 * [
 * { type: "keyword", value: "class" },
 * { type: "identifier", value: "Demo" },
 * { type: "punctuation", value: "{" },
 * { type: "property", value: "value" },
 * { type: "operator", value: "=" },
 * { type: "number", value: "10" },
 * { type: "punctuation", value: ";" },
 * { type: "function-name", value: "getValue" },
 * { type: "punctuation", value: "(" },
 * { type: "punctuation", value: ")" },
 * { type: "punctuation", value: "{" },
 * { type: "keyword", value: "return" },
 * { type: "keyword", value: "this" },
 * { type: "operator", value: "." },
 * { type: "property", value: "value" },
 * { type: "punctuation", value: ";" },
 * { type: "punctuation", value: "}" },
 * { type: "punctuation", value: "}" }
* ]
*
 * @remarks
    * La detección de propiedades incluye:
    * - this.prop
    * - prop: tipo
    * - prop = valor
    * - { prop: valor }
*/
export function EpTokenizeScript(script: string): CodeScriptToken[] {
    const tokens: CodeScriptToken[] = [];
    let i = 0;

    const keywords = new Set([
        "import", "from", "export", "class", "extends",
        "implements", "interface", "public", "private",
        "protected", "readonly", "new", "return", "this",
        "if", "else", "const", "let", "var", "function"
    ]);

    while (i < script.length) {
        const ch = script[i];

        // WHITESPACE
        if (/\s/.test(ch)) {
            let value = "";
            while (i < script.length && /\s/.test(script[i])) value += script[i++];
            tokens.push({ type: "whitespace", value });
            continue;
        }

        // COMMENT //
        if (script.startsWith("//", i)) {
            let value = "";
            i += 2;
            while (i < script.length && script[i] !== "\n") value += script[i++];
            tokens.push({ type: "comment", value });
            continue;
        }

        // COMMENT /* */
        if (script.startsWith("/*", i)) {
            let value = "";
            i += 2;
            while (i < script.length && !script.startsWith("*/", i)) value += script[i++];
            if (script.startsWith("*/", i)) i += 2;
            tokens.push({ type: "comment", value });
            continue;
        }

        // STRINGS
        if (ch === "'" || ch === '"') {
            const quote = ch;
            let value = quote;
            i++;
            while (i < script.length && script[i] !== quote) value += script[i++];
            if (script[i] === quote) value += script[i++];
            tokens.push({ type: "string", value });
            continue;
        }

        // TEMPLATE STRING
        if (ch === "`") {
            let value = "`";
            i++;
            while (i < script.length && script[i] !== "`") value += script[i++];
            if (script[i] === "`") value += script[i++];
            tokens.push({ type: "string", value });
            continue;
        }

        // NUMBERS
        if (/[0-9]/.test(ch)) {
            let value = "";
            while (i < script.length && /[0-9.]/.test(script[i])) value += script[i++];
            tokens.push({ type: "number", value });
            continue;
        }

        // OPERATORS & PUNCTUATION
        const opMatch = script.slice(i).match(/^(=>|===|==|!=|<=|>=|&&|\|\||[=:\-><{}[\](),.;])/);
        if (opMatch) {
            tokens.push({ type: "operator", value: opMatch[0] });
            i += opMatch[0].length;
            continue;
        }

        // IDENTIFIER / KEYWORD / FUNCTION / PROPERTY
        if (/[A-Za-z_$]/.test(ch)) {
            let value = "";
            while (i < script.length && /[A-Za-z0-9_$]/.test(script[i])) value += script[i++];

            const before = script.slice(0, i);
            const after = script.slice(i).trimStart();
            const next = after[0];

            // keyword
            if (keywords.has(value)) {
                tokens.push({ type: "keyword", value });
                continue;
            }

            // boolean
            if (value === "true" || value === "false") {
                tokens.push({ type: "boolean", value });
                continue;
            }

            // function name (identifier followed by "(" )
            if (next === "(") {
                tokens.push({ type: "function-name", value });
                continue;
            }

            // PROPERTY RULES ------------------------

            // 1. this.property
            if (before.endsWith("this.")) {
                tokens.push({ type: "property", value });
                continue;
            }

            // 2. class property:  label: type OR label = value
            if (next === ":" || next === "=") {
                tokens.push({ type: "property", value });
                continue;
            }

            // 3. object literal property: label:
            if (next === ":") {
                tokens.push({ type: "property", value });
                continue;
            }

            // identifier normal
            tokens.push({ type: "identifier", value });
            continue;
        }

        // DEFAULT
        tokens.push({ type: "punctuation", value: ch });
        i++;
    }

    return tokens;
}


/* ────────────────────────────────────────────── */
/* 🧱 CONSTRUCTORES DE BLOQUES Y VARIABLES        */
/* ────────────────────────────────────────────── */

/**
 * Construye un bloque de atributos HTML/Angular.
 * Ignora valores `undefined`, `null`, `false` y cadenas vacías.
 */
export function EpBuildAttrs(obj: Record<string, any>, indent = 0) {
    const entries = Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '');
    return entries.length
        ? ' ' + entries.map(([k, v]) => `${k}${v === "$_" ? "" : "=" + '"' + v + '"'}`).join('\n' + EpPad(indent))
        : '';
}

/**
 * Construye un conjunto de variables multilínea.
 * Similar a `EpBuildAttrs`, pero usando formato `clave = valor`.
 */
export function EpMultilineVars(obj: Record<string, any>, indent = 0, divider = ' = ', separator = '') {
    const entries = Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null);
    return entries.length
        ? EpPad(indent) + entries
            .map(([k, v]) => `${k}${divider}${typeof v === 'string' ? '"' : ''}${v}${typeof v === 'string' ? '"' : ''}${separator}`)
            .join('\n' + EpPad(indent))
        : '';
}

/**
 * Crea una variable normal (const, let o var).
 */
export function EpBuildVar(name: string, value?: string, type?: string, kind: 'const' | 'let' | 'var' = 'const') {
    const typeStr = type ? `: ${type}` : '';
    const _value = value ? ` = ${value}` : '';
    return `${kind} ${name}${typeStr}${_value};`;
}

/**
 * Crea una propiedad de clase (sin const/let).
 */
export function EpBuildProp(name: string, value: string, type?: string, kind?: string,) {
    const _kind = kind ? `${kind} ` : '';
    const typeStr = type ? `: ${type}` : '';
    const _value = value ? ` = ${value}` : '';
    return `${_kind}${name}${typeStr}${_value};`;
}

/**
 * Crea un array formateado con indentación recursiva y soporte multilinea.
 */
export function EpBuildArray(name: string, items: string[], type?: string, pad = 4) {
    const typeStr = type ? `${type}[]` : '[]';
    const baseIndent = EpPad(pad); // indentación del nivel de clase

    const formattedItems = items.map((i, idx) => {
        const itemBody = EpIndentBlock(EpDedent(i.trim()), pad, 2);
        const comma = idx < items.length - 1 ? ',' : '';
        return `${itemBody}${comma}`;
    });

    return `${baseIndent}${name}: ${typeStr} = [\n${formattedItems.join('\n')}\n${baseIndent}];`;
}

function EpBuildValue(
    value: any,
    pad: number,
    level = 1
): string {
    // valor simple
    if (typeof value !== 'object' || value === null) {
        return JSON.stringify(value);
    }

    // array
    if (Array.isArray(value)) {
        if (!value.length) return '[]';

        const inner = value
            .map(v => EpBuildValue(v, pad, level + 1))
            .map((v, i) => {
                const body = EpIndentBlock(EpDedent(String(v)), pad, level + 1);
                return `${body}${i < value.length - 1 ? ',' : ''}`;
            })
            .join('\n');

        return `[\n${inner}\n${EpPad(pad * level)}]`;
    }

    // objeto normal
    const entries = Object.entries(value);
    if (!entries.length) return `{}`;

    const innerObj = entries
        .map(([k, v]) => {
            const val = EpBuildValue(v, pad, level + 1);
            const line =
                `${EpPad(pad * (level + 1))}${k}: ${val},`;
            return line;
        })
        .join('\n');

    return `{\n${innerObj}\n${EpPad(pad * level)}}`;
}


export function EpBuildArrayObjects(
    name: string,
    items: Record<string, any>[],
    type?: string,
    pad = 4
) {
    const indent = EpPad(pad);
    const typeStr = type ? `${type}[]` : '[]';

    const cleaned = items
        .map(i => EpClean(i))
        .filter(Boolean);

    const body = cleaned
        .map((obj, i) => {
            const val = EpBuildValue(obj, pad, 1);
            const block = EpIndentBlock(EpDedent(val), pad, 2);
            return `${block},`;
        })
        .join('\n');

    return `${indent}${name}: ${typeStr} = [\n${body}\n${indent}];`;
}


/**
 * Crea un objeto formateado con indentación recursiva y soporte multilinea.
 */
export function EpBuildObject(
    name: string,
    obj: Record<string, any>,
    type?: string,
    pad = 4
) {
    const cleaned = EpClean(obj) ?? {};
    const indent = EpPad(pad);
    const typeStr = type ? `: ${type}` : '';

    const inner = Object.entries(cleaned)
        .map(([k, v]) => {
            const val = EpBuildValue(v, pad, 1);
            const body = EpIndentBlock(EpDedent(val), pad, 2);
            return `${indent}  ${k}: ${body},`;
        })
        .join('\n');

    return `${indent}${name}${typeStr} = {\n${inner}\n${indent}};`;
}



/**
 * Crea una función o método con cuerpo indentado automáticamente.
 */
export function EpBuildFunction(name: string, args: string[], body: string[], returnType?: string) {
    const ret = returnType ? `: ${returnType}` : '';
    const inner = EpIndentBlock(body.join('\n'), 4, 2);
    return `${name}(${args.join(', ')})${ret} {\n${inner}\n${EpPad(4)}}`;
}

/**
 * Construye una interfaz TypeScript con sus propiedades tipadas y valores por defecto opcionales.
 */
export function EpBuildInterface(
    name: string,
    props: { name: string; type: string; optional?: boolean; description?: string; default?: string }[],
    indent = 4,
    _export?: boolean,
) {
    const lines: string[] = [];

    for (const p of props) {
        const desc = p.description ? `${EpPad(indent)}/** ${p.description} */\n` : '';
        const def = p.default ? ` // default: ${p.default}` : '';
        const opt = p.optional ? '?' : '';
        lines.push(`${desc}${EpPad(indent)}${p.name}${opt}: ${p.type};${def}`);
    }

    return [
        `${_export ? 'export ' : ''}interface ${name} {`,
        lines.join('\n'),
        `}`
    ].join('\n');
}

/* ────────────────────────────────────────────── */
/* 🧩 CONSTRUCCIÓN DE COMPONENTES BASE             */
/* ────────────────────────────────────────────── */

interface EpImport {
    from: string;
    imports: string[];
}

interface EpDocScriptBase {
    imports: EpImport[];
    component: string;
    body: string[];
}
/** Representa un nodo HTML / Angular */
interface EpNode {
    tag: string;
    attrs?: Record<string, any>;
    children?: (EpNode | string)[];
    selfClose?: boolean;
    indent?: number;
}

/** Crea una etiqueta HTML o Angular con indentación y contenido recursivo */
export function EpBuildNode(node: EpNode, level = 0): string {
    const pad = EpPad(level);
    const addPad = node.tag.length - 2
    const attrs = node.attrs ? EpBuildAttrs(node.attrs, level + 4 + addPad) : '';
    const openTag = `${pad}<${node.tag}${attrs}${node.selfClose ? ' />' : '>'}`;

    if (node.selfClose) return openTag;

    const body = (node.children ?? [])
        .map(c =>
            typeof c === 'string'
                ? EpPad(level + 4) + c
                : EpBuildNode(c, level + 4)
        )
        .join('\n');

    const closeTag = `${pad}</${node.tag}>`;
    return [openTag, body, closeTag].filter(Boolean).join('\n');
}

/**
 * Crea el bloque base de un componente Angular con imports, decorador y clase.
 */
export function EpBuildDocScriptBase({ imports, component, body }: EpDocScriptBase): string {
    const importLines = imports
        .filter(i => i.imports && i.imports.length > 0)
        .sort((a, b) => a.from.localeCompare(b.from))
        .map(i =>
            `import { ${i.imports.sort((a, b) => a.localeCompare(b)).join(', ')} } from '${i.from}';`
        )
        .join('\n');

    const classBody = EpIndentBlock(body.join('\n\n'), 4, 1);

    return [
        importLines, '',
        '@Component({/* ... */})',
        `export class ${component} {`,
        classBody,
        '}',
    ].join('\n');
}

/* ────────────────────────────────────────────── */
/* 🎯 UTILIDADES DE EXTRACCIÓN DE TOKENS           */
/* ────────────────────────────────────────────── */

const REGEX_MAP: Record<string, RegExp> = {
    color: /^color-(.+)$/,
    size: /^size-(.+)$/,
    weight: /^weight-(.+)$/,
    transform: /^transform-(.+)$/,
    opacity: /^opacity-(.+)$/,
    select: /^select-(.+)$/,
};

function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/**
 * Busca en un conjunto de tokens (clases, modifiers, etc.)
 * el primero que coincida con un prefijo definido.
 * Ejemplo: EpExtractToken(['color-red', 'size-md'], 'color') → 'red'
 */
export function EpExtractToken(
    tokens: string | string[],
    prefix: string | string[]
): string | undefined {

    if (typeof tokens === 'string') tokens = tokens.split(/\s+/);

    // ────────────────────────────────────────────────
    // Caso simple: prefix string → NO aceptar tokens con corchetes
    // ────────────────────────────────────────────────
    if (typeof prefix === 'string') {
        const escaped = escapeRegex(prefix);
        const regex = REGEX_MAP[prefix] ?? new RegExp(`^${escaped}-(.+)$`);

        // Solo tokens "plano": no deben contener “[” ni “]”
        const plainTokens = tokens.filter(t => !/\[|\]/.test(t));

        return plainTokens.find(t => regex.test(t))?.replace(regex, '$1');
    }

    // ────────────────────────────────────────────────
    // Caso recursivo: prefix es array (se permiten corchetes)
    // ────────────────────────────────────────────────
    if (prefix.length === 0) return undefined;

    const [currentPrefix, ...rest] = prefix;

    const escaped = escapeRegex(currentPrefix);
    const regex = new RegExp(`^${escaped}-(.+)$`);

    const match = tokens.find(t => regex.test(t))?.replace(regex, '$1');

    if (!match) return undefined;

    // Si es [valor] → procesar internamente
    if (/^\[.*\]$/.test(match)) {
        const inner = match.slice(1, -1);
        return EpExtractToken(inner.split(/\s+/), rest);
    }

    // Si NO tiene corchetes:
    if (rest.length > 0) return undefined;

    return match;
}


/**
 * Valida un token contra una lista de permitidos.
 * Por ejemplo:
 *   Phase = ["first", "last"]
 *   EpValidateToken("abc", ["first", "last"]) → undefined
 */
export function EpValidateToken<
    T extends string | number
>(
    token: string | undefined | null,
    allowed: readonly T[]
): T | undefined {
    if (token == null) return undefined;

    // Si coincide exactamente con un string permitido:
    if (allowed.includes(token as T)) {
        return token as T;
    }

    // Intentar convertir a número
    const num = Number(token.replace(/^--/, "-"));
    if (!Number.isNaN(num) && allowed.includes(num as T)) {
        return num as T;
    }

    return undefined;
}