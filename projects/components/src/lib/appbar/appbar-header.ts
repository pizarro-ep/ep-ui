import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, EventEmitter, HostBinding, inject, Input, model, Output, } from '@angular/core';
import { EpComponents } from '../init';
import { Color, DefaultAppbar, Size, } from './theme/config';
import { getHeaderButtonClass, getHeaderClass, getHeaderLabelClass } from './theme/classes';
import { EP_APPBAR_TOKEN } from './appbar.token';
import { EpButtonComponent } from "../button/button";
import { EpAppendDirective, EpPrependDirective } from '@ep/directives';

@Component({
    selector: 'ep-appbar-header',
    standalone: true,
    imports: [CommonModule, EpButtonComponent],
    template: `
        <div class="flex w-max flex-1 items-center gap-2.5">
            @if(hasMenu){
                <div [ngClass]="buttonClass()">
                    <ep-button (click)="toggleMenu()"
                            type="icon"
                            variant="text"
                            color="secondary"
                            icon="menu"/>
                </div>
            }
            <ng-container *ngTemplateOutlet="prependTpl?.template"></ng-container>            
            @if(label){
                <span [ngClass]="labelClass()">{{label}}</span>            
            }
        </div>
        @if(appendTpl){
            <div class="flex gap-1 items-center">
                <ng-container *ngTemplateOutlet="appendTpl.template"></ng-container>
            </div>
        }
    `
})
export class EpAppbarHeaderComponent extends EpComponents {
    // TODO: Propiedades de inyección
    @Input() label?: string;
    @Input() hasMenu?: boolean;
    @Output() onToggleMenu = new EventEmitter<void>();
    size = model<Size>();
    color = model<Color>();
    @ContentChild(EpPrependDirective) prependTpl?: EpPrependDirective;
    @ContentChild(EpAppendDirective) appendTpl?: EpAppendDirective;

    // TODO: Propiedades (UI)
    public containerClass = computed(() => getHeaderClass());
    public buttonClass = computed(() => getHeaderButtonClass());
    public labelClass = computed(() => getHeaderLabelClass({ size: this.size(), color: this.color() }));

    constructor() {
        super();
        const parent = inject(EP_APPBAR_TOKEN, { optional: true });
        this.size() ?? this.size.set(parent?.size ?? DefaultAppbar.size);
        this.color() ?? this.color.set(parent?.labelColor ?? DefaultAppbar.labelColor);
    }

    // TODO: Métodos del template
    toggleMenu() {
        this.onToggleMenu.emit();
    }

    // TODO: Host
    @HostBinding('class')
    get hostClass() {
        return this.containerClass();
    }
}