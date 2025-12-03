import { Classes } from "./config";

type Elements = 'HOST' | 'HEADER' | 'CONTENT' | 'FOOTER';

type ElementClass = Record<Elements, Classes>

export const CLASSES: ElementClass = {
    HOST: {
        bg: ['bg-ep-container', 'dark:bg-ep-container-dark'],
        position: ['fixed', 'z-50', 'inset-0'],
        display: ['flex', 'flex-col', 'items-between'],
        space: ['my-3', 'ml-4', 'py-3', 'gap-3'],
        width: 'w-72',
        height: 'h-[calc(100vh-24px)]',
        translate: ['-translate-x-80', 'lg:translate-x-0'],
        transition: ['transition-transform', 'duration-300'],
        rounded: 'rounded-xl',
        shadow: 'shadow-ep-lg',
    },
    HEADER: {
        display: ['flex', 'flex-none', 'items-center'],
        width: 'w-full',
    },
    CONTENT: {
        display: 'flex-1',
        width: 'w-full',
        height: 'h-full',
        overflow: 'overflow-y-auto',
    },
    FOOTER: {
        display: ['grid', 'flex-none', 'justify-items-center'],
        width: 'w-full',
        space: ['px-3', 'gap-2'],
    },
}