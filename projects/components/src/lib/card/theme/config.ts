import { ClassList, ClassName, Colors1, Colors3, Levels, Roundeds, Sizes1, Variants1 } from "@ep/global";

export type Variant = Variants1;
export type Rounded = Roundeds;
export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type Block = boolean;
export type Disabled = boolean;
export type Hoverable = boolean;
export type Level = Levels;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Card {
    variant: Variant;
    color: Color;
    size: Size;
    rounded: Rounded;
}

export const DefaultCard: Readonly<Card> = {
    variant: 'outlined',
    color: 'secondary',
    size: 'md',
    rounded: 'md',
};