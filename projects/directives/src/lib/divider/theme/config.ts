import { ClassList, ClassName, Colors1, Colors3, Opacities, Sizes4, Variants7 } from "@ep/global";

export type Variant = Variants7;
export type Color = Colors1 | Colors3;
export type Opacity = Opacities;
export type Thickness = Sizes4;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Divider {
    variant: Variant;
    color: Color;
    thickness: Thickness;
}

export const DefaultDivider: Divider = {
    variant: 'horizontal',
    color: 'secondary',
    thickness: 1,
}