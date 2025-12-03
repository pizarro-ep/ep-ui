import { ClassList, Colors1, ClassName, Roundeds, Sizes1, Variants1, Colors3 } from "@ep/global";

export type Variant = Variants1;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type Rounded = Roundeds
export type Closable = boolean;
export type Visible = boolean;
export type Disabled = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Chip {
    variant: Variant;
    size: Size;
    color: Color;
    rounded: Rounded;
    visible: Visible;
}

export const DefaultChip: Readonly<Chip> = {
    variant: 'tonal',
    size: 'md',
    color: 'primary',
    rounded: 'full',
    visible: true,
};