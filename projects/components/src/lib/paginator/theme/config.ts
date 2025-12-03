import { ClassList, ClassName, Colors1, Colors3, PositionsY, Roundeds, Sizes1 } from "@ep/global";

export type Color = Colors1 | Colors3;
export type Rounded = Roundeds
export type Size = Sizes1;
export type TextPosition = PositionsY;
export type HasText = boolean;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Paginator {
    rounded: Rounded;
    size: Size;
    color: Color;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    hasText: boolean;
    textPosition: TextPosition;
}

export const DefaultPaginator: Readonly<Paginator> = {
    rounded: 'md',
    size: 'md',
    color: 'brand-2',
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
    hasText: true,
    textPosition: 'bottom',
};

// |------------------------>
