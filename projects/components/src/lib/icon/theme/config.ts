import { ClassList, ClassName, Colors1, Colors2, Colors3, Sizes2, Variants6 } from "@ep/global";

export type Variant = Variants6;
export type Color = Colors1 | Colors2 | Colors3;
export type Size = Sizes2;
export type Icon = string;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Icons {
    variant: Variant;
};

export const DefaultIcon: Readonly<Icons> = {
    variant: 'outlined',
}