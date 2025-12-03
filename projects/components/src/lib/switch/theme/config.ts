import { ClassList, ClassName, Colors1, Colors3, Sizes1, Variants8 } from "@ep/global";

export type Variant = Variants8;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type ReadOnly = boolean;
export type Disabled = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Switch {
    variant: Variant,
    color: Color;
    size: Size;
}

export const DefaultSwitch: Readonly<Switch> = {
    variant: 'default',
    color: 'primary',
    size: 'md',
}