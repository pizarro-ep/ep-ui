import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, ContentChildren, effect, EventEmitter, HostBinding, inject, input, Input, model, Output, QueryList, signal, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EpComponents } from '../init';
import { DefaultList, Selected, Disabled, Expanded, } from './theme/config';
import { getItemClass, getItemLabelClass, getItemSubLabelClass, getListClass, getSubListClass } from './theme/classes';
import { EpAppendDirective, EpDividerDirective, EpPrependDirective, EpRotateDirective } from '@ep/directives';
import { EpIconComponent } from '../icon/icon';
import { EpListComponent, EpListItem } from './list';
import { EP_LIST_TOKEN } from './list.token';
import { EpListItemService } from './list.service';

@Component({
    selector: 'ep-list-item',
    standalone: true,
    host: { ngSkipHydration: '' },
    imports: [CommonModule, RouterModule, EpIconComponent, EpRotateDirective, EpDividerDirective],
    providers: [EpListItemService],
    templateUrl: './list-item.html',
})
export class EpListItemComponent extends EpComponents {
    // TODO: Propiedades de inyección
    @Input({ required: true }) label!: string;
    @Input() subLabel?: string;
    @Input() value?: string;
    @Input() route?: string;
    @Input() prependIcon?: string;
    @Input() appendIcon?: string;
    @Input() expandable?: boolean;
    @Input({ transform: (v: boolean | undefined | null) => v ?? true }) expandedIcon: boolean = true;
    @Input() divider?: boolean;
    expanded = model<Expanded | undefined>(undefined);
    selected = input<Selected>();
    disabled = input<Disabled>();
    @Output() expandedChange = new EventEmitter<Expanded>();
    @Output() onItemClick = new EventEmitter<EpListItem>();
    @ContentChild(EpPrependDirective, { descendants: false }) prependTpl?: EpPrependDirective;
    @ContentChild(EpAppendDirective, { descendants: false }) appendTpl?: EpAppendDirective;
    @ContentChildren(EpListComponent) childList?: QueryList<EpListComponent>;

    // TODO: Propiedades (UI)
    private parent = inject(EP_LIST_TOKEN, { optional: true });
    private router = inject(Router);

    public _variant = computed(() => this.parent?._variant() ?? DefaultList.variant);
    public _color = computed(() => this.parent?._color() ?? DefaultList.color);
    public _selectedColor = computed(() => this.parent?._selectedColor());
    public _size = computed(() => this.parent?._size() ?? DefaultList.size);
    public _space = computed(() => this.parent?._space());
    public _rounded = computed(() => this.parent?._rounded());
    public _hoverable = computed(() => this.parent?._hoverable());
    public _expanded = computed(() => this.expanded() ?? true);

    public _selected = signal(false);
    public isSelected = computed(() => this._selected() || this.selected());
    public _disabled = signal(false);
    public isDisabled = computed(() => this._disabled() || this.disabled());

    public itemClass = computed(() => getItemClass({
        variant: this._variant(),
        color: this._color(),
        selectedColor: this._selectedColor(),
        size: this._size(),
        rounded: this._rounded(),
        hoverable: this._hoverable(),
        selected: this.isSelected(),
        disabled: this.isDisabled(),
    }));
    public listClass = computed(() => getListClass({ space: this._space() }));
    public labelClass = computed(() => getItemLabelClass({ size: this._size() }));
    public subLabelClass = computed(() => getItemSubLabelClass({ size: this._size() }));
    public subListClass = computed(() => getSubListClass({ expanded: this._expanded() }));

    constructor() {
        super();
        effect(() => {
            if (!this.route) {
                this._selected.set(false);
                return;
            }
            const active = this.router.isActive(this.route, true);
            this._selected.set(active);
        });
    }

    // TODO: Métodos del template
    emitClickEvent() {
        if (this.expandable) {
            this.expanded.set(!this.expanded());
            this.expandedChange.emit(this.expanded());
        } else {
            const emitValue: EpListItem = {
                label: this.label,
                subLabel: this.subLabel,
                value: this.value ?? this.label,
                expandable: this.expandable,
                expanded: this.expanded(),
                selected: this.isSelected(),
                divider: this.divider,
            };
            this.onItemClick.emit(emitValue);
        }
    }
    getSelectRouterLink() {
        return this.itemClass();
    }
    listHasChildClass() {
        return this.hasChild && this.expanded() ? 'brightness-85 dark:brightness-115' : '';
    }

    // TODO: Getters
    get hasChild() {
        return this.childList?.length ?? 0 > 0;
    }
    get rotateClass() {
        const phase = this._expanded() ? 'phase-last' : 'phase-first';
        return [phase, 'to-90'].join(' ');
    }
    get dividerClass() {
        const color = `color-${this._color()}`;
        return ['variant-vertical', 'opacity-50', color].join(' ');
    }

    // TODO: Host
    @HostBinding('class') get hostClass() { return "contents"; }
}
