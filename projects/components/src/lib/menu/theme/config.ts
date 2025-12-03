import { ClassList, ClassName, Colors1, IWidths, PositionsX, PositionsY, Roundeds, Sizes1, Sizes3, Types2, Variants1 } from "@ep/global";

export type Variant = Variants1;
export type Color = Colors1;
export type DropdownType = Types2;
export type Size = Sizes1;
export type Disabled = boolean;
export type ReadOnly = boolean;
export type Rounded = Roundeds;
export type Width = Sizes3;
export type IWidth = IWidths;
export type PositionX = PositionsX;
export type PositionY = PositionsY;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Dropdown {
    variant: Variant
    color: Color
    size: Size
    type: DropdownType
    rounded: Rounded,
}

export const DefaultDropdown: Readonly<Dropdown> = {
    variant: 'tonal',
    size: 'md',
    color: 'primary',
    type: 'button',
    rounded: 'md',
};
