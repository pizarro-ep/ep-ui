import { Component, computed, ContentChild, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { Color, DefaultSidebar, Size } from './theme/config';
import { getHeaderClass } from './theme/classes';
import { EpListItemComponent } from '../list/list-item';
import { EpAppendDirective, EpPrependDirective } from '@ep/directives';

@Component({
    selector: 'ep-sidebar-header',
    standalone: true,
    imports: [CommonModule, EpListItemComponent, EpPrependDirective, EpAppendDirective],
    template: `
        <ep-list-item [label]="label ?? ''"
            [subLabel]="subLabel"
            [route]="route"
            variant="plain"
            [prependIcon]="prependIcon"
            [appendIcon]="appendIcon">
            @if(prependTpl){
                <ng-template epPrepend>
                    <ng-container *ngTemplateOutlet="prependTpl.template"></ng-container>
                </ng-template>
            }
            @if(appendTpl){
                <ng-template epAppend>
                    <ng-container *ngTemplateOutlet="appendTpl.template"></ng-container>
                </ng-template>
            }
        </ep-list-item>
    `
})
export class EpSidebarHeaderComponent extends EpComponents {
    // TODO: Propiedades de inyección
    @Input() color: Color = DefaultSidebar.color;
    @Input() size: Size = DefaultSidebar.size;
    @Input() label?: string;
    @Input() subLabel?: string;
    @Input() route?: string = '/';
    @Input() prependIcon?: string;
    @Input() appendIcon?: string;
    @ContentChild(EpPrependDirective) prependTpl?: EpPrependDirective;
    @ContentChild(EpAppendDirective) appendTpl?: EpAppendDirective;

    // TODO: Propiedades (UI)
    public containerClass = computed(() => getHeaderClass());

    // TODO: Host
    @HostBinding('class')
    get hostClass() {
        return this.containerClass();
    }
}