import { Angles, ClassList, ClassName, Phases } from "@ep/global";

export type Phase = Phases;
export type Angle = Angles;
export type EpClass = ClassName;
export type Classes = ClassList;

export interface Rotate {
    phase: Phase;
}

export const DefaultRotate: Readonly<Rotate> = {
    phase: 'first',
}