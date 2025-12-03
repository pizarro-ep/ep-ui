import { Component, Input, ContentChildren, QueryList, AfterContentInit, computed, input, ContentChild, HostBinding, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { Color, DefaultTable, Align, Size, Variant, } from './theme/config';
import { getBodyCellClass, getBodyClass, getBodyRowClass, getCaptionClass, getFootCellClass, getFootClass, getHeadCellClass, getHeadClass, getJustifyClass } from './theme/classes';
import { EpTableCaptionDirective, EpTableColumnDirective, EpTableFooterDirective } from '@ep/directives';
import { EpCheckboxComponent } from "../checkbox/checkbox";
import { EpPaginatorComponent } from "../paginator/paginator";

export interface EpTableHeaders {
  title: string;
  key: string;
  align?: Align;
}

@Component({
  selector: 'ep-table',
  standalone: true,
  imports: [CommonModule, EpCheckboxComponent, EpPaginatorComponent],
  templateUrl: './table.html',
})
export class EpTableComponent extends EpComponents implements AfterContentInit {
  // TODO: Propiedades de inyección
  @Input({ required: true }) headers: EpTableHeaders[] = [];
  @Input() selectable?: boolean;
  @Input() shadow?: boolean;
  @Input() headerVisible: boolean = DefaultTable.headerVisible;
  @Input() hasPaginator?: boolean;
  items = input<any[]>([]);
  variant = input<Variant>(DefaultTable.variant);
  color = input<Color>();
  hoverColor = input<Color>();
  size = input<Size>(DefaultTable.size)
  bordered = input<boolean>();
  striped = input<boolean>();
  hoverable = input<boolean>();
  currentPage = model<number>();
  itemsPerPage = input<number>(DefaultTable.itemsPerPage);

  @ContentChild(EpTableCaptionDirective) captionTemplate?: EpTableCaptionDirective;
  @ContentChildren(EpTableColumnDirective, { descendants: true }) templates!: QueryList<EpTableColumnDirective>;
  @ContentChildren(EpTableFooterDirective) footerTemplates!: QueryList<EpTableFooterDirective>;


  // TODO: Propiedades (UI)
  public columnTemplates: Record<string, EpTableColumnDirective> = {};
  public columnFooters: Record<string, EpTableFooterDirective> = {};

  public totalItems = computed(() => this.items()?.length ?? 0);
  public totalPages = computed(() => {
    const ps = Math.max(1, this.itemsPerPage());
    return Math.max(1, Math.ceil(this.totalItems() / ps));
  });
  public paginatedData = computed(() => {
    const ps = Math.max(1, this.itemsPerPage());
    const start = (this._currentPage() - 1) * ps;
    const endExclusive = Math.min(start + ps, this.totalItems());
    return (this.items() ?? []).slice(start, endExclusive);
  });
  public _currentPage = computed(() => {
    return Number(this.currentPage() ?? DefaultTable.currentPage);
  })

  public captionClass = computed(() => getCaptionClass({
    size: this.size(),
  }));
  public headClass = computed(() => getHeadClass({
    size: this.size(),
  }));
  public headCellClass = computed(() => getHeadCellClass({
    size: this.size(),
  }));
  public bodyClass = computed(() => getBodyClass({
    size: this.size(),
    bordered: this.bordered(),
  }));
  public bodyRowClass = computed(() => getBodyRowClass({
    variant: this.variant(),
    striped: this.striped(),
    hoverable: this.hoverable(),
    color: this.color(),
    hoverColor: this.hoverColor()
  }));
  public bodyCellClass = computed(() => getBodyCellClass({
    variant: this.variant(),
    size: this.size(),
    striped: this.striped(),
    hoverable: this.hoverable(),
    color: this.color(),
    hoverColor: this.hoverColor()
  }));
  public footClass = computed(() => getFootClass({
    size: this.size(),
  }));
  public footCellClass = computed(() => getFootCellClass({
    size: this.size(),
  }));

  constructor() {
    super();
    effect(() => {
      const validPage = this._currentPage();
      if (this.currentPage() !== validPage && this.currentPage() !== undefined) {
        this.currentPage.set(validPage);
      }
    });
  }

  // TODO: Ciclo de vida
  ngAfterContentInit() {
    this.templates.changes.subscribe(() => this.mapTemplates());
    this.mapTemplates();
    this.footerTemplates.changes.subscribe(() => this.mapFooterTemplates());
    this.mapFooterTemplates();
  }

  // TODO: Métodos del template
  private mapTemplates() {
    const map: Record<string, EpTableColumnDirective> = {};
    this.templates.forEach(t => { map[t.key] = t; });
    this.columnTemplates = map;
  }
  private mapFooterTemplates() {
    const map: Record<string, EpTableFooterDirective> = {};
    this.footerTemplates.forEach(f => {
      if (f.key) {
        map[f.key] = { template: f.template, colspan: f.colspan ?? 1 };
      } else { // Si no tiene key, se trata de un footer "global"
        map['__global'] = { template: f.template, colspan: f.colspan ?? 1 };
      }
    });
    this.columnFooters = map;
  }
  public getJustify(justify?: Align) {
    return getJustifyClass({ justify: justify });
  }

  // TODO: Getters
  getFooterCells() {
    const cells: { key: string; colspan: number; template?: any }[] = [];
    const headersCopy = [...this.headers];
    let skip = 0;

    for (const h of headersCopy) {
      if (skip > 0) {
        skip--;
        continue;
      }

      const footer = this.columnFooters[h.key];
      if (footer) {
        const colspan = Math.max(footer.colspan ?? 1, 1);
        cells.push({
          key: h.key,
          colspan,
          template: footer.template,
        });
        skip = colspan - 1;
      } else {
        cells.push({ key: h.key, colspan: 1 });
      }
    }

    return cells;
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() { return "grid gap-3"; }
}
