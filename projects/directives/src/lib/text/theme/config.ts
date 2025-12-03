import { ClassList, ClassName, ColorsAll, FontWeights, Opacities, Sizes2, TextTransforms, UserSelects } from "@ep/global";

export type Color = ColorsAll;
export type Size = Sizes2;
export type Weight = FontWeights;
export type Transform = TextTransforms;
export type Select = UserSelects;
export type Opacity = Opacities;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Text {
    color: Color;
}

export const DefaultText: Readonly<Text> = {
    color: 'title',
}