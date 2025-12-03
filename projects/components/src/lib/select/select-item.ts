import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, EventEmitter, HostBinding, inject, input, Input, Output, } from '@angular/core';
import { EpComponents } from '../init';
import { getItemClass, getItemLabelClass, getItemSubLabelClass } from './theme/classes';
import { DefaultSelect } from './theme/config';
import { EP_SELECT_TOKEN } from './select.token';
import { EpSelectItem } from './select';
import { EpAppendDirective, EpPrependDirective, } from '@ep/directives';
import { EpIconComponent } from '../icon/icon';

@Component({
    selector: 'ep-select-item',
    standalone: true,
    host: { ngSkipHydration: '' },
    imports: [CommonModule, EpIconComponent],
    providers: [],
    templateUrl: './select-item.html',
})
export class EpSelectItemComponent extends EpComponents {
    // TODO: Propiedades de inyección
    @Input({ required: true }) label!: string;
    @Input() subLabel?: string;
    @Input() prependIcon?: string;
    @Input() appendIcon?: string;
    value = input<string>();
    @Output() onItemClick = new EventEmitter<EpSelectItem>();
    @ContentChild(EpPrependDirective, { descendants: false }) prependTpl?: EpPrependDirective;
    @ContentChild(EpAppendDirective, { descendants: false }) appendTpl?: EpAppendDirective;

    // TODO: Propiedades (UI)
    private parent = inject(EP_SELECT_TOKEN, { optional: true });

    public _color = computed(() => this.parent?.color() ?? DefaultSelect.color);
    public _size = computed(() => this.parent?.size() ?? DefaultSelect.size);
    public _rounded = computed(() => this.parent?.rounded() ?? DefaultSelect.rounded);
    public _value = computed(() => this.value() ?? this.label);
    public _selected = computed(() => this.parent?.value() === this._value());

    public itemClass = computed(() => getItemClass({
        color: this._color(),
        size: this._size(),
        rounded: this._rounded(),
        selected: this._selected() || (this as any).selected,
    }))
    public labelClass = computed(() => getItemLabelClass({ size: this._size() }));
    public subLabelClass = computed(() => getItemSubLabelClass({ size: this._size() }));

    // TODO: Métodos del template
    emitClickEvent() {
        const emitValue: EpSelectItem = {
            label: this.label,
            subLabel: this.subLabel,
            value: this._value(),
            prependIcon: this.prependIcon,
            appendIcon: this.appendIcon,
        };
        this.onItemClick.emit(emitValue);
    }

    // TODO: Host
    @HostBinding('class') get hostClass() { return "contents"; }
}
