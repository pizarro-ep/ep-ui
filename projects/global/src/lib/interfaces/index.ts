import { Gaps, Paddings, Sizes3 } from "../types"

export interface IPaddings {
    p?: Paddings,
    pSm?: Paddings,
    pMd?: Paddings,
    pLg?: Paddings;
    pXl?: Paddings;
    p2xl?: Paddings;
    px?: Paddings;
    pxSm?: Paddings;
    pxMd?: Paddings;
    pxLg?: Paddings;
    pxXl?: Paddings;
    px2xl?: Paddings;
    py?: Paddings;
    pySm?: Paddings;
    pyMd?: Paddings;
    pyLg?: Paddings;
    pyXl?: Paddings;
    py2xl?: Paddings;
}
export interface IGaps {
    g?: Gaps,
    gSm?: Gaps,
    gMd?: Gaps,
    gLg?: Gaps;
    gXl?: Gaps;
    g2xl?: Gaps;
    gx?: Gaps;
    gxSm?: Gaps;
    gxMd?: Gaps;
    gxLg?: Gaps;
    gxXl?: Gaps;
    gx2xl?: Gaps;
    gy?: Gaps;
    gySm?: Gaps;
    gyMd?: Gaps;
    gyLg?: Gaps;
    gyXl?: Gaps;
    gy2xl?: Gaps;
}

export interface IWidths {
    base?: Sizes3;
    sm?: Sizes3;
    md?: Sizes3;
    lg?: Sizes3;
    xl?: Sizes3;
    "2xl"?: Sizes3;
}
export interface IHeights {
    base?: Sizes3;
    sm?: Sizes3;
    md?: Sizes3;
    lg?: Sizes3;
    xl?: Sizes3;
    "2xl"?: Sizes3;
}
