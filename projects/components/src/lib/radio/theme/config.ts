import { ClassList, ClassName, Colors1, Colors3, Roundeds, Sizes1, Variants3 } from "@ep/global";

export type Variant = Variants3;
export type Size = Sizes1;
export type Color = Colors1 | Colors3;
export type Block = boolean;
export type Rounded = Roundeds;
export type Disabled = boolean;
export type ReadOnly = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Radio {
    variant: Variant;
    size: Size;
    color: Color;
    rounded: Rounded;
    containerRounded: Rounded;
}

export const DefaultRadio: Readonly<Radio> = {
    variant: 'default',
    size: 'md',
    color: 'secondary',
    rounded: 'md',
    containerRounded: 'md',
};