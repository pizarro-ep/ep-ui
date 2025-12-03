import { ClassList, ClassName, Colors1, Sizes1, Variants1, Roundeds, Colors3, Gaps } from "@ep/global";

export type Variant = Variants1;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type Rounded = Roundeds
export type Space = Sizes1;
export type Hoverable = boolean;
export type Selected = boolean;
export type Disabled = boolean;
export type Expanded = boolean;
export type Block = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface List {
    variant: Variant;
    color: Color;
    size: Size;
}

export const DefaultList: Readonly<List> = {
    variant: 'text',
    color: 'secondary',
    size: 'md',
};