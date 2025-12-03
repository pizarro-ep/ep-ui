import { ClassName, Roundeds, Sizes3, Colors4, ClassList, Paddings, } from "@ep/global";

export type Rounded = Roundeds
export type Color = Colors4;
export type Width = Sizes3;
export type Height = Sizes3;
export type Padding = Paddings;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Container { }

export const DefaultContainer: Readonly<Container> = {};