import { ClassList, ClassName, Colors1, Colors3, PositionsY, Roundeds, Sizes1, Variants2 } from "@ep/global";

export type Variant = Variants2;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type Rounded = Roundeds;
export type TextPosition = PositionsY;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface EntriesSelector {
    variant: Variant;
    rounded: Rounded;
    size: Size;
    color: Color;
    value: number;
    avaliableLimits: any[];
}

export const DefaultEntriesSelector: Readonly<EntriesSelector> = {
    variant: 'filled',
    color: 'secondary',
    size: 'xs',
    rounded: 'md',
    value: 10,
    avaliableLimits: [{ label: '10', value: "10" }, { label: '25', value: "25" }, { label: '50', value: "50" }, { label: '100', value: "100" }]
};