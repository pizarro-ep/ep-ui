import { ClassList, ClassName, Colors1, Variants1, Roundeds, BreakPoints, Sizes1, IPaddings, IGaps, } from "@ep/global";

export type Variant = Variants1;
export type Color = Colors1;
export type Size = Sizes1;
export type Rounded = Roundeds;
export type BreakPoint = BreakPoints;
export type EpClass = ClassName;
export type Classes = ClassList;
export type Padding = IPaddings;
export type Gap = IGaps;

export interface Appbar {
    variant: Variant;
    color: Color;
    labelColor: Color;
    size: Size;
    rounded: Rounded;
    padding: Padding;
    gap: Gap;
}

export const DefaultAppbar: Readonly<Appbar> = {
    variant: 'text',
    color: 'secondary',
    labelColor: 'primary',
    size: 'md',
    rounded: 'md',
    padding: {},
    gap: { g: 0.5 },
};