import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, computed, ContentChild, EventEmitter, HostBinding, input, Input, Output } from "@angular/core";
import { EpComponents } from "../init";
import { Color, DefaultAppbar, Rounded, Size, Variant, Padding, Gap } from "./theme/config";
import { getMenuClass } from "./theme/classes";
import { EpListComponent, EpListItem } from "../list/list";

@Component({
    selector: 'ep-appbar-menu',
    standalone: true,
    imports: [CommonModule, EpListComponent],
    template: `
        @if(menuList){
            <ng-content select="ep-list"></ng-content>
        }@else {
            <ep-list [variant]="variant"
                [color]="color"
                [size]="size"
                [items]="items"
                [space]="size"
                [hoverable]="true"
                [rounded]="rounded" (onItemClick)="onToggleMenu.emit();">
            </ep-list>
        }
    `
})
export class EpAppbarMenuComponent extends EpComponents implements AfterContentInit {
    // TODO: Propiedades de inyección
    @Input() variant: Variant = DefaultAppbar.variant;
    @Input() color: Color = DefaultAppbar.color;
    @Input() size: Size = DefaultAppbar.size;
    @Input() rounded: Rounded = DefaultAppbar.rounded;
    @Input() items: EpListItem[] = [];
    padding = input<Padding>(DefaultAppbar.padding);
    gap = input<Gap>(DefaultAppbar.gap);
    @Output() onToggleMenu = new EventEmitter<void>();
    @ContentChild(EpListComponent) menuList?: EpListComponent;

    // TODO: Propiedades (UI)
    public hostContainerClass = computed(() => getMenuClass({ padding: this.padding(), gap: this.gap() }));

    // TODO: Ciclo de vida
    ngAfterContentInit(): void {
        if (this.menuList) this.menuList.onItemClick.subscribe(() => this.onToggleMenu.emit());
    }

    // TODO: Getters y setters
    get existsItems() {
        return this.items.length > 0;
    }

    // TODO: Host
    @HostBinding('class')
    get hostClass() { return this.hostContainerClass(); }
}