import { computed, Directive, HostBinding, input } from '@angular/core';
import { EpDirectives } from '../init';
import { Color, DefaultDivider, EpClass, Opacity, Thickness, Variant } from './theme/config';
import { getHostClass } from './theme/classes';
import { EpExtractToken } from '@ep/global';

@Directive({
  selector: 'div[epDivider]'
})
export class EpDividerDirective extends EpDirectives {
  // TODO: Propiedades de inyección
  epDivider = input<EpClass>();

  private parsed = computed(() => {
    const tokens = (this.epDivider() ?? '').split(/\s+/);
    return {
      variant: EpExtractToken(tokens, 'variant') as Variant,
      color: EpExtractToken(tokens, 'color') as Color,
      thickness: EpExtractToken(tokens, 'thickness') as unknown as Thickness,
      opacity: EpExtractToken(tokens, 'opacity') as unknown as Opacity,
    };
  });

  // TODO: Propiedades (UI)
  public dividerClass = computed(() => getHostClass({
    variant: this.parsed().variant ?? DefaultDivider.variant,
    color: this.parsed().color ?? DefaultDivider.color,
    thickness: this.parsed().thickness ?? DefaultDivider.thickness,
    opacity: this.parsed().opacity,
  }));

  // TODO: Host
  @HostBinding('class') get hostClass() { return this.dividerClass(); }
}
