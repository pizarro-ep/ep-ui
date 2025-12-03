import { ClassList, ClassName, Colors1, Colors3, Roundeds, Sizes1, Types1, Variants2 } from "@ep/global";

export type Variant = Variants2;
export type Color = Colors1 | Colors3;
export type Size = Sizes1
export type Rounded = Roundeds;
export type Disabled = boolean;
export type ReadOnly = boolean;
export type InputType = Types1;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Input {
    variant: Variant;
    color: Color;
    size: Size;
    rounded: Rounded;
    type: InputType;
    step: number;
}

export const DefaultInput: Readonly<Input> = {
    variant: 'filled',
    color: 'secondary',
    size: 'md',
    type: 'text',
    rounded: 'md',
    step: 1,
};
