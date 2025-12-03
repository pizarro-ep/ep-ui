import { Component, computed, ContentChild, HostBinding, input, Input, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EpComponents } from "../init";
import { Color, Variant, Size, Rounded, DefaultSidebar, IPadding, IGap } from "./theme/config";
import { getContentClass } from "./theme/classes";
import { EpListComponent, EpListItem } from "../list/list";

@Component({
    selector: 'ep-sidebar-content',
    standalone: true,
    imports: [CommonModule, EpListComponent],
    template: `
        @if(list){
            <ng-content select="ep-list"></ng-content>
        }@else {
            <ep-list [variant]="variant"
                [color]="color"
                [size]="size"
                [items]="menuItems"
                [space]="size"
                [hoverable]="true"
                [rounded]="rounded">
            </ep-list>
        }
    `
})
export class EpSidebarContentComponent extends EpComponents {
    // TODO: Propiedades de inyección
    @Input() variant: Variant = DefaultSidebar.variant;
    @Input() color: Color = DefaultSidebar.color;
    @Input() size: Size = DefaultSidebar.size;
    @Input() rounded: Rounded = DefaultSidebar.rounded;
    @Input() menuItems: EpListItem[] = [];
    padding = input<IPadding>();
    gap = input<IGap>();
    @ContentChild(EpListComponent) list?: EpListComponent;

    // TODO: Propiedades (UI)
    public containerClass = computed(() => getContentClass({
        padding: this.padding(),
        gap: this.gap(),
    }));

    // TODO: Host
    @HostBinding('class')
    get hostClass() {
        return this.containerClass();
    }
}