import { Injectable } from '@angular/core';
import { EpListComponent } from './list';

@Injectable()
export class EpListItemService {
    private first?: EpListComponent;

    register(list: EpListComponent): boolean {
        if (!this.first) {
            this.first = list;
            return true; // permitido
        }
        console.warn('[ep-list-item] registro rechazado: ya existe un <ep-list>.');
        return false; // duplicado
    }

    unregister(list: EpListComponent) {
        if (this.first === list) this.first = undefined;
    }
}
