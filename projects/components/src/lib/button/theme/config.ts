import { ClassList, ClassName, Colors1, Colors3, Roundeds, Sizes1, Types3, Variants1 } from "@ep/global";

export type Variant = Variants1;
export type Size = Sizes1;
export type Rounded = Roundeds;
export type Color = Colors1 | Colors3;
export type Block = boolean;
export type ButtonType = Types3;
export type Disabled = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Button {
    variant: Variant;
    size: Size;
    color: Color;
    rounded: Rounded;
    type: ButtonType;
}

export const DefaultButton: Readonly<Button> = {
    variant: 'tonal',
    size: 'md',
    color: 'primary',
    rounded: 'md',
    type: 'button',
};