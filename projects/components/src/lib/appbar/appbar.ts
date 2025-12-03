import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, computed, ContentChild, forwardRef, HostBinding, input, Input } from "@angular/core";
import { EpComponents } from "../init";
import { Color, DefaultAppbar, Rounded, Size } from "./theme/config";
import { getHostClass } from "./theme/classes";
import { EP_APPBAR_TOKEN } from "./appbar.token";
import { EpAppbarHeaderComponent } from "./appbar-header";
import { EpAppbarMenuComponent } from "./appbar-menu";
import { EpDividerDirective, } from "@ep/directives";


@Component({
  selector: 'ep-appbar',
  standalone: true,
  imports: [CommonModule, EpAppbarHeaderComponent, EpDividerDirective],
  providers: [{ provide: EP_APPBAR_TOKEN, useExisting: forwardRef(() => EpAppbarComponent) }],
  templateUrl: './appbar.html',
  styleUrl: './appbar.css'
})
export class EpAppbarComponent extends EpComponents implements AfterContentInit {
  // TODO: Propiedades de inyección
  @Input() size: Size = DefaultAppbar.size;
  @Input() color: Color = DefaultAppbar.color;
  @Input() labelColor: Color = DefaultAppbar.labelColor;;
  @Input() labelSize: Size = DefaultAppbar.size;
  rounded = input<Rounded>(DefaultAppbar.rounded);
  @ContentChild(EpAppbarHeaderComponent) headerComponent?: EpAppbarHeaderComponent;
  @ContentChild(EpAppbarMenuComponent) menuComponent?: EpAppbarMenuComponent;

  // TODO: Propiedades (UI)
  public isMenuOpen: boolean = false;
  public hostContainerClass = computed(() => getHostClass({ rounded: this.rounded() }))

  ngAfterContentInit(): void {
    this.headerComponent?.onToggleMenu.subscribe(() => this.toggleMenu());
    this.menuComponent?.onToggleMenu.subscribe(() => this.toggleMenu());
    if (this.menuComponent) this.menuComponent.size = this.size;
  }

  // TODO: Métodos del template
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return this.hostContainerClass();
  }
}
