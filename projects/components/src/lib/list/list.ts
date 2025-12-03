import { CommonModule } from '@angular/common';
import { Component, computed, ContentChildren, EventEmitter, forwardRef, HostBinding, inject, input, Input, OnDestroy, OnInit, Optional, Output, QueryList, } from '@angular/core';
import { EpComponents } from '../init';
import { Color, DefaultList, Hoverable, Space, Rounded, Size, Variant } from './theme/config';
import { getListClass } from './theme/classes';
import { EpListItemComponent } from './list-item';
import { EP_LIST_TOKEN } from './list.token';
import { EpListItemService } from './list.service';

export interface EpListItem {
  label: string;
  subLabel?: string;
  value?: string;
  route?: string;
  prependIcon?: string;
  appendIcon?: string;
  expandable?: boolean;
  expanded?: boolean;
  expandedIcon?: boolean;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
  children?: EpListItem[];
}

@Component({
  selector: 'ep-list',
  standalone: true,
  imports: [CommonModule, EpListItemComponent],
  providers: [{ provide: EP_LIST_TOKEN, useExisting: forwardRef(() => EpListComponent) }],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class EpListComponent extends EpComponents implements OnInit, OnDestroy {
  // TODO: Propiedades de inyección
  @Input() items: EpListItem[] = [];
  variant = input<Variant>();
  color = input<Color>();
  selectedColor = input<Color>();
  size = input<Size>();
  rounded = input<Rounded>();
  space = input<Space>();
  hoverable = input<Hoverable>();
  @Output() onItemClick = new EventEmitter<EpListItem>();
  @ContentChildren(EpListItemComponent) listItems?: QueryList<EpListItemComponent>;

  // TODO: Propiedades (UI)
  private parent = inject(EpListItemComponent, { optional: true, skipSelf: true });
  public allowed = true;

  public _variant: () => Variant = computed(() => this.variant() ?? this.parent?._variant() ?? DefaultList.variant);
  public _color: () => Color = computed(() => this.color() ?? this.parent?._color() ?? DefaultList.color);
  public _selectedColor: () => Color | undefined = computed(() => this.selectedColor() ?? this.parent?._selectedColor());
  public _size: () => Size = computed(() => this.size() ?? this.parent?._size() ?? DefaultList.size);
  public _space: () => Space | undefined = computed(() => this.space() ?? this.parent?._space());
  public _rounded: () => Rounded | undefined = computed(() => this.rounded() ?? this.parent?._rounded());
  public _hoverable: () => Hoverable | undefined = computed(() => this.hoverable() ?? this.parent?._hoverable());

  public listClass = computed(() => getListClass({ space: this._space() }));

  constructor(@Optional() private parentService: EpListItemService) { super() }

  // TODO: Ciclo de vida
  ngOnInit() {
    if (this.parentService) this.allowed = this.parentService.register(this);
  }
  ngOnDestroy() { this.parentService?.unregister(this); }

  // TODO: Métodos del template
  emitItemClick(item: EpListItem) {
    this.onItemClick.emit(item);
  }
  get isProjection(): boolean {
    return (this.listItems?.length ?? 0) > 0;
  }

  // TODO: Host
  @HostBinding('class') get hostClass() { return 'contents' }
}
