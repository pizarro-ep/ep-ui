import { CommonModule } from '@angular/common';
import { Component, computed, ContentChild, ElementRef, HostBinding, input } from '@angular/core';
import { EpComponents } from '../init';
import { Color, DefaultIcon, Icon, Size, Variant } from './theme/config';
import { getIconClass, getIconContainerClass } from './theme/classes';
import { TYPE_GLOBAL_VARIANTS_6 } from '@ep/global';

@Component({
  selector: 'ep-icon',
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css'
})
export class EpIconComponent extends EpComponents {
  // TODO: Propiedades de inyección
  variant = input<Variant>();
  color = input<Color>();
  icon = input<Icon>();
  size = input<Size>();
  @ContentChild('svg', { read: ElementRef }) svg?: ElementRef<SVGElement>;

  // TODO: Propiedades (UI)
  public _variant = computed<Variant>(() => {
    if (this.variant()) return this.variant()!;

    const iconValue = this.icon();
    if (!iconValue) return DefaultIcon.variant;

    const tokens = iconValue.split(/\s+/);
    const found = tokens.find(this.isVariant);

    return found ?? DefaultIcon.variant;
  });
  public _icon = computed(() => {
    const iconValue = this.icon();
    if (!iconValue) return undefined;

    const variant = this._variant();
    const tokens = iconValue.split(/\s+/);

    // Filtrar la variante, dejando solo el nombre real del icono
    const filtered = tokens.filter(t => t !== variant);

    // Si no queda nada, usa el default
    return filtered.join(' ') || undefined;
  });

  public iconClass = computed(() => getIconClass({
    variant: this._variant(),
    icon: this._icon(),
  }));
  public iconContainerClass = computed(() => getIconContainerClass({
    color: this.color(),
    size: this.size(),
  }));

  // TODO: Métodos del template
  isVariant(value: string): value is Variant {
    return TYPE_GLOBAL_VARIANTS_6.includes(value as Variant);
  }

  // TODO: Host
  @HostBinding('class')
  get hostClass() {
    return 'inline-flex items-center justify-center';
  }
}
