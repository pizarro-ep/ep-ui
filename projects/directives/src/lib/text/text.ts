import { computed, Directive, HostBinding, input, Optional, TemplateRef } from "@angular/core"
import { EpDirectives } from "../init"
import { DefaultText, EpClass } from "./theme/config"
import { getHostClass } from "./theme/classes";
import { EpExtractToken, EpValidateToken, TYPE_GLOBAL_COLORS_ALL, TYPE_GLOBAL_FONTWEIGHTS, TYPE_GLOBAL_OPACITIY, TYPE_GLOBAL_SIZES_2, TYPE_GLOBAL_TEXTTRANSFORMS, TYPE_GLOBAL_USERSELECTS } from "@ep/global";

@Directive({
  selector: '[epText], ng-template[epText]',
  standalone: true
})
export class EpTextDirective extends EpDirectives {
  // TODO: Propiedades de inyección
  epText = input<EpClass>();

  // TODO: Propiedades (UI)
  private parsed = computed(() => {
    const tokens = (this.epText() ?? '').split(/\s+/);
    return {
      color: EpValidateToken(EpExtractToken(tokens, 'color'), TYPE_GLOBAL_COLORS_ALL),
      size: EpValidateToken(EpExtractToken(tokens, 'size'), TYPE_GLOBAL_SIZES_2),
      weight: EpValidateToken(EpExtractToken(tokens, 'weight'), TYPE_GLOBAL_FONTWEIGHTS),
      transform: EpValidateToken(EpExtractToken(tokens, 'transform'), TYPE_GLOBAL_TEXTTRANSFORMS),
      select: EpValidateToken(EpExtractToken(tokens, 'select'), TYPE_GLOBAL_USERSELECTS),
      opacity: EpValidateToken(EpExtractToken(tokens, 'opacity'), TYPE_GLOBAL_OPACITIY),
    };
  });

  public hostContainerClass = computed(() => getHostClass({
    color: this.parsed().color ?? DefaultText.color,
    size: this.parsed().size,
    weight: this.parsed().weight,
    transform: this.parsed().transform,
    select: this.parsed().select,
    opacity: this.parsed().opacity,
  }));

  constructor(@Optional() public template: TemplateRef<any> | null) {
    super();
  }

  @HostBinding('class')
  get hostClass() {
    return this.hostContainerClass();
  }
}