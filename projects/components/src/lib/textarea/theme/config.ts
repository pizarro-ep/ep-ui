import { ClassList, ClassName, Colors1, Colors3, Roundeds, Sizes1, Variants2 } from "@ep/global";

export type Variant = Variants2;
export type Color = Colors1 | Colors3;
export type Size = Sizes1
export type Rounded = Roundeds;
export type Disabled = boolean;
export type ReadOnly = boolean;
export type Resize = boolean;
export type HasLabel = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Textarea {
    variant: Variant;
    color: Color;
    size: Size;
    rounded: Rounded;
    rows: number;
}

export const DefaultTextarea: Readonly<Textarea> = {
    variant: 'filled',
    color: 'secondary',
    size: 'md',
    rounded: 'md',
    rows: 3,
};