import { Component, computed, ContentChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpComponents } from '../init';
import { EpSidebarHeaderComponent } from './sidebar-header';
import { EpSidebarContentComponent } from './sidebar-content';
import { EpSidebarFooterComponent } from './sidebar-footer';
import { getHostClass } from './theme/classes';

@Component({
  selector: 'ep-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class EpSidebarComponent extends EpComponents {
  // TODO: Propiedades de inyección
  @ContentChild(EpSidebarHeaderComponent) headerComponent?: EpSidebarHeaderComponent;
  @ContentChild(EpSidebarContentComponent) contentComponent?: EpSidebarContentComponent;
  @ContentChild(EpSidebarFooterComponent) footerComponent?: EpSidebarFooterComponent;

  // TODO: Propiedades (UI)
  private hostContainerClass = computed(() => getHostClass());

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return this.hostContainerClass();
  }
}
