import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EpBreakpointService implements OnDestroy {
    private _isSm = new BehaviorSubject<boolean>(false);
    private _isMd = new BehaviorSubject<boolean>(false);
    private _isLg = new BehaviorSubject<boolean>(false);
    private _isXl = new BehaviorSubject<boolean>(false);
    private _is2Xl = new BehaviorSubject<boolean>(false);

    isSm$ = this._isSm.asObservable();
    isMd$ = this._isMd.asObservable();
    isLg$ = this._isLg.asObservable();
    isXl$ = this._isXl.asObservable();
    is2Xl$ = this._is2Xl.asObservable();

    private _currentBreakpoint = new BehaviorSubject<string>('base');
    currentBreakpoint$ = this._currentBreakpoint.asObservable();

    private queries = {
        sm: window.matchMedia('(min-width: 40rem)'),   // 640px
        md: window.matchMedia('(min-width: 48rem)'),   // 768px
        lg: window.matchMedia('(min-width: 64rem)'),   // 1024px
        xl: window.matchMedia('(min-width: 80rem)'),   // 1280px
        '2xl': window.matchMedia('(min-width: 96rem)') // 1536px
    };

    private listeners: (() => void)[] = [];

    constructor() {
        this.init();
    }

    private init() {
        this.updateValues();

        for (const [key, query] of Object.entries(this.queries)) {
            const listener = (e: MediaQueryListEvent) => {
                this.updateValues();
            };
            query.addEventListener('change', listener);
            this.listeners.push(() => query.removeEventListener('change', listener));
        }
    }

    private updateValues() {
        const isSm = this.queries.sm.matches;
        const isMd = this.queries.md.matches;
        const isLg = this.queries.lg.matches;
        const isXl = this.queries.xl.matches;
        const is2Xl = this.queries['2xl'].matches;

        this._isSm.next(isSm);
        this._isMd.next(isMd);
        this._isLg.next(isLg);
        this._isXl.next(isXl);
        this._is2Xl.next(is2Xl);

        let current = 'base';
        if (is2Xl) current = '2xl';
        else if (isXl) current = 'xl';
        else if (isLg) current = 'lg';
        else if (isMd) current = 'md';
        else if (isSm) current = 'sm';

        this._currentBreakpoint.next(current);
    }

    ngOnDestroy(): void {
        this.listeners.forEach(remove => remove());
    }
}
