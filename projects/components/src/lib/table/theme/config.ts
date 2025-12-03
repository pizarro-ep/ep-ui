import { Colors1, ClassName, Variants5, ClassList, FlexJustifies, Colors3, Sizes1 } from "@ep/global";

export type Variant = Variants5;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type Align = FlexJustifies;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Table {
    variant: Variant;
    color: Color;
    size: Size;
    headerVisible: boolean;
    currentPage: number;
    itemsPerPage: number;
}

export const DefaultTable: Readonly<Table> = {
    variant: 'default',
    color: 'primary',
    size: 'md',
    headerVisible: true,
    currentPage: 1,
    itemsPerPage: 10,
}; 
