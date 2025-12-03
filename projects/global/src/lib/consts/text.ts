import { ClassName, FontWeights, TextTransforms, UserSelects } from "../types"

type FontWeightClass = Record<FontWeights, ClassName>
type TextTransformClass = Record<TextTransforms, ClassName>
type UserSelectClass = Record<UserSelects, ClassName>

export const GLOBAL_FONTWEIGHT: FontWeightClass = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
}

export const GLOBAL_TEXTTRANSFORM: TextTransformClass = {
    none: 'normal-case',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
}

export const GLOBAL_USERSELECT: UserSelectClass = {
    none: 'select-none',
    text: 'select-text',
    all: 'select-all',
    auto: 'select-auto',
}