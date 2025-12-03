import { ClassList, ClassName, Colors1, Colors3, IWidths, PositionsX, PositionsY, Roundeds, Sizes1, Sizes3, Variants2 } from "@ep/global";

export type Variant = Variants2;
export type Color = Colors1 | Colors3;
export type Size = Sizes1
export type Rounded = Roundeds;
export type Disabled = boolean;
export type ReadOnly = boolean;
export type Width = Sizes3;
export type IWidth = IWidths;
export type PositionX = PositionsX;
export type PositionY = PositionsY;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Select {
    variant: Variant
    color: Color;
    size: Size
    rounded: Rounded
}

export const DefaultSelect: Readonly<Select> = {
    variant: 'filled',
    color: 'secondary',
    size: 'md',
    rounded: 'md',
};

