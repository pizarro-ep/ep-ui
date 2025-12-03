import { ClassList, ClassName, Variants4, Types4, Types5, Colors1, Levels, Colors3, } from "@ep/global";

export type Variant = Variants4;
export type Type = Types4;
export type Icon = Types5;
export type Color = Colors1 | Colors3;
export type Show = boolean;
export type Text = string;
export type Level = Levels;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Modal {
    variant: Variant;
    type: Type;
    icon: Icon;
    confirmButtonShow: Show;
    confirmButtonText: Text;
    confirmButtonColor: Color;
    denyButtonShow: Show;
    denyButtonText: Text;
    denyButtonColor: Color;
    cancelButtonShow: Show;
    cancelButtonText: Text;
    cancelButtonColor: Color;
}

export const DefaultModal: Readonly<Modal> = {
    variant: 'static',
    type: 'alert',
    icon: 'success',
    confirmButtonShow: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: 'primary',
    denyButtonShow: false,
    denyButtonText: 'Cancelar',
    denyButtonColor: 'error',
    cancelButtonShow: false,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: 'secondary',
};

