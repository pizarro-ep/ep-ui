import { ClassList, ClassName, Colors1, Colors3, Sizes1 } from "@ep/global";

export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Copy {
    color: Color;
    size: Size;
    label: string;
}

export const DefaultCopy: Readonly<Copy> = {
    color: 'secondary',
    size: 'sm',
    label: 'Copiar'
}