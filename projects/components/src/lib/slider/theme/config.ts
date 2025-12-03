import { ClassList, ClassName, Colors1, Colors3, Sizes1 } from "@ep/global";

export type Color = Colors1 | Colors3;
export type Size = Sizes1;
export type ReadOnly = boolean;
export type Disabled = boolean;
export type Tooltip = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Slider {
    color: Color;
    size: Size;
    step: number;
    min: number;
    max: number;
}

export const DefaultSlider: Readonly<Slider> = {
    color: 'secondary',
    size: 'md',
    step: 1,
    min: 0,
    max: 100
}