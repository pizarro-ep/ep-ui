import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EpThemeService {
    private theme = signal<'light' | 'dark'>(this.getInitialTheme());

    constructor() {
        // Reactivo: cada vez que cambia theme() se aplica al DOM
        effect(() => {
            this.applyTheme(this.theme());
        });
    }

    /** Devuelve el tema actual */
    isDarkMode() {
        return this.theme() === 'dark';
    }

    /** Alternar entre dark/light */
    toggleTheme() {
        this.theme.update(mode => (mode === 'dark' ? 'light' : 'dark'));
    }

    /** Obtener desde localStorage o por defecto */
    private getInitialTheme(): 'light' | 'dark' {
        if (!this.isBrowser()) return 'dark';
        return (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark';
    }

    /** Aplica el tema al DOM */
    private applyTheme(mode: 'light' | 'dark') {
        if (!this.isBrowser()) return;
        const root = document.documentElement;
        root.classList.toggle('dark', mode === 'dark');
        root.style.setProperty('color-scheme', mode);
        localStorage.setItem('theme', mode);
    }

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }
}
