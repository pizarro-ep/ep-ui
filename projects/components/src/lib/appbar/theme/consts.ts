import { Classes } from "./config";

type Elements = 'HOST' | 'HEADER' | 'HEADER_BUTTON' | 'HEADER_LABEL' | 'MENU';

type ElementClass = Record<Elements, Classes>;

export const CLASSES: ElementClass = {
    HOST: {
        display: 'grid',
        width: 'w-full',
        height: 'min-h-[52px]',
        space: ['gap-1', 'p-3'],
        bg: ['bg-ep-container', 'dark:bg-ep-container-dark', 'shadow-ep-lg'],
    },
    HEADER: {
        display: ['flex', 'flex-wrap', 'items-center', 'justify-center'],
        width: 'w-full',
        space: ['gap-x-3', 'gap-y-1.5'],
    },
    HEADER_BUTTON: {
        display: ['flex', 'flex-none', 'lg:hidden', 'items-center', 'justify-center'],
    },
    HEADER_LABEL: {
        text: ['leading-none', 'font-bold', 'text-nowrap'],
    },
    MENU: {
        display: 'flex-1',
        width: 'w-full',
        height: 'h-full',
        overflow: 'overflow-y-auto',
    }
}