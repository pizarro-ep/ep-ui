import { CommonModule } from '@angular/common';
import { Component, computed, effect, HostBinding, Input, input, model, } from '@angular/core';
import { EpComponents } from '../init';
import { Color, DefaultPaginator, HasText, Rounded, Size, TextPosition } from './theme/config';
import { getButtonContainerClass, getIconClass, getTextClass } from './theme/classes';
import { EpButtonComponent } from '../button/button';

@Component({
  selector: 'ep-paginator',
  standalone: true,
  imports: [CommonModule, EpButtonComponent],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class EpPaginatorComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @Input() color: Color = DefaultPaginator.color;
  @Input() rounded: Rounded = DefaultPaginator.rounded;
  @Input() hasText: HasText = DefaultPaginator.hasText;
  @Input() textPosition: TextPosition = DefaultPaginator.textPosition;
  size = input<Size>(DefaultPaginator.size);
  totalItems = input<number>(DefaultPaginator.totalItems);
  itemsPerPage = input<number>();
  currentPage = model<number>();

  // TODO: Propiedades (UI)
  buttonContainerClass = computed(() => getButtonContainerClass({ size: this.size() }));
  iconClass = computed(() => getIconClass({ size: this.size() }));
  textClass = computed(() => getTextClass({ size: this.size() }));
  _currentPage = computed(() => {
    const page = Number(this.currentPage() ?? DefaultPaginator.currentPage);
    const total = this.totalPages();

    if (isNaN(page) || page < 1) return 1;
    if (page > total) return total;
    return page;
  });
  _itemsPerPage = computed(() => {
    const ipp = Number(this.itemsPerPage());
    if (isNaN(ipp) || ipp < 1) return DefaultPaginator.itemsPerPage;
    return ipp;
  });
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this._itemsPerPage()))
  );
  startIndex = computed(() =>
    (this._currentPage() - 1) * this._itemsPerPage() + 1
  );
  endIndex = computed(() =>
    Math.min(this.startIndex() + this._itemsPerPage() - 1, this.totalItems())
  );
  pages = computed(() => {
    const total = Math.max(1, Math.ceil(this.totalItems() / this._itemsPerPage()));
    const current = this._currentPage();
    const maxVisible = 5; // número máximo de páginas visibles al centro

    if (total <= maxVisible + 2) {
      // si hay pocas páginas, muéstralas todas
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // siempre mostramos la primera página
    pages.push(1);

    // calcular rango dinámico
    let start = Math.max(2, current - Math.floor(maxVisible / 2));
    let end = Math.min(total - 1, start + maxVisible - 1);

    // ajustar si el rango es muy pequeño al final
    if (end - start + 1 < maxVisible) {
      start = Math.max(2, end - maxVisible + 1);
    }

    // agregar "…" si hay salto al inicio
    if (start > 2) pages.push("…");

    // agregar rango visible
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // agregar "…" si hay salto al final
    if (end < total - 1) pages.push("…");

    // siempre mostramos la última página
    pages.push(total);

    return pages;
  });
  text = computed(() => {
    const total = this.totalItems() <= 0 ? 0 : this.totalItems();
    if (total === 0) return 'Sin registros';
    const plural = total === 1 ? '' : 's';
    return `Mostrando del ${this.startIndex()} al ${this.endIndex()} de ${total} ítem${plural}`;
  });

  constructor() {
    super();
    effect(() => {
      const validPage = this._currentPage();
      if (this.currentPage() !== validPage && this.currentPage() !== undefined) {
        this.currentPage.set(validPage);
      }
    });
  }

  // TODO: Métodos del template
  changePage(page: number | string) {
    const newPage = Number(page);
    if (newPage < 1 || newPage > this.totalPages()) return;
    this.currentPage.set(newPage);
  }
  isCurrentPage(page: number | string) {
    return Number(this._currentPage()) === Number(page);
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'contents'; }
}
