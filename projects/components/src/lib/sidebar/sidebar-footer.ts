import { CommonModule } from "@angular/common";
import { Component, computed, HostBinding } from "@angular/core";
import { EpComponents } from "../init";
import { getFooterClass } from "./theme/classes";

@Component({
    selector: 'ep-sidebar-footer',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`
})
export class EpSidebarFooterComponent extends EpComponents {
    // TODO: Propiedades (UI)
    public containerClass = computed(() => getFooterClass());

    // TODO: Host
    @HostBinding('class')
    get hostClass() {
        return this.containerClass();
    }
}