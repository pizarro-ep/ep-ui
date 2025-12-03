import { EpMerge, GLOBAL_FLEX_JUSTIFY, GLOBAL_TEXT_SIZE, GLOBAL_TEXT_SIZE_LARGE, GLOBAL_TEXT_SIZE_SMALL } from '@ep/global';
import { Color, EpClass, Align, Size, Variant } from './config';
import { getBaseBg } from './helpers';
import { BODY_DIVIDE, BODY_ROW_BG, BODY_ROW_CELL_BG, BODY_CELL_STRIPED_BG, BODY_ROW_STRIPED_BG, BODY_ROW_HOVER_BG, BODY_CELL_BG, CELL_VARIANT, TABLE_SIZES, TABLE_SIZES_2, } from './consts';

export function getCaptionClass(options: { size: Size }): EpClass {
    const _ = { size: GLOBAL_TEXT_SIZE_LARGE[options.size], }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getHeadClass(options: { size: Size }): EpClass {
    const _ = {
        size: GLOBAL_TEXT_SIZE_SMALL[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getHeadCellClass(options: { size: Size }): EpClass {
    const _ = {
        size: TABLE_SIZES[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getBodyClass(options: { size: Size, bordered?: boolean }): EpClass {
    const _ = {
        size: GLOBAL_TEXT_SIZE[options.size],
        divide: options.bordered && BODY_DIVIDE
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getBodyRowClass(options: { variant: Variant, striped?: boolean; hoverable?: boolean, color?: Color, hoverColor?: Color }): EpClass {
    const BASE_BG = getBaseBg(options, BODY_ROW_STRIPED_BG, BODY_ROW_CELL_BG, BODY_ROW_BG);
    const HOVER_BG = options.hoverable
        ? (options.striped
            ? BODY_ROW_HOVER_BG[options.hoverColor ?? 'secondary']
            : BODY_ROW_HOVER_BG[options.hoverColor ?? 'primary'])
        : [];
    const _ = {
        bg: (options.variant !== 'separated') && [BASE_BG, HOVER_BG],
    };
    return EpMerge.objectToStr(_).toClassNames();
}

export function getBodyCellClass(options: { variant: Variant, size: Size, striped?: boolean, hoverable?: boolean, color?: Color, hoverColor?: Color }): EpClass {
    const BASE_BG = getBaseBg(options, BODY_CELL_STRIPED_BG, BODY_ROW_CELL_BG, BODY_ROW_BG);
    const HOVER_BG = options.hoverable
        ? (options.striped
            ? BODY_CELL_BG[options.hoverColor ?? 'secondary']
            : BODY_CELL_BG[options.hoverColor ?? 'primary'])
        : [];
    const _ = {
        size: TABLE_SIZES[options.size],
        cell: CELL_VARIANT[options.variant],
        bg: (options.variant === 'separated') && [BASE_BG, HOVER_BG],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getFootClass(options: { size: Size }): EpClass {
    const _ = {
        size: GLOBAL_TEXT_SIZE_SMALL[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getFootCellClass(options: { size: Size }): EpClass {
    const _ = {
        size: TABLE_SIZES_2[options.size],
    }
    return EpMerge.objectToStr(_).toClassNames();
}

export function getJustifyClass(options: { justify?: Align }): EpClass {
    const _ = {
        justify: options.justify && GLOBAL_FLEX_JUSTIFY.base[options.justify],
    }
    return EpMerge.objectToStr(_).toClassNames();
}
