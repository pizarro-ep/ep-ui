import { ClassName, Colors1, Sizes1, Variants1, Roundeds, BreakPoints, Groups, Levels, ClassList, IPaddings, IGaps } from "@ep/global";

export type Variant = Variants1;
export type Color = Colors1;
export type Size = Sizes1;
export type Rounded = Roundeds;
export type BreakPoint = BreakPoints;
export type Group = Groups;
export type Level = Levels;
export type IPadding = IPaddings;
export type IGap = IGaps;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Sidebar {
    variant: Variant;
    color: Color;
    size: Size;
    rounded: Rounded;
}

export const DefaultSidebar: Readonly<Sidebar> = {
    variant: 'text',
    color: 'secondary',
    size: 'md',
    rounded: 'md'
};
