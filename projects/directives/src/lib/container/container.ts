import { computed, Directive, HostBinding, input } from '@angular/core';
import { EpDirectives } from '../init';
import { Color, EpClass, Height, Padding, Rounded, Width } from './theme/config';
import { getHostClass } from './theme/classes';
import { EpExtractToken } from '@ep/global';

/**
 * Directiva `EpContainerDirective`
 *
 * Se utiliza para generar contenedores estilizados mediante un sistema de
 * clases semánticas basado en tokens (`color-*`, `rounded-*`, `p-*`, `h-*`, `w-*`).
 *
 * Permite que cualquier elemento host —incluyendo `ng-template`— reciba estilos
 * dinámicos derivados de la cadena pasada en `epContainer`.
 *
 * ## Ejemplo de uso
 * ```html
 * <div epContainer="color-primary rounded-md p-4 w-full">
 *     Contenido...
 * </div>
 *
 * <ng-template epContainer="color-success p-2">
 *     ...
 * </ng-template>
 * ```
 *
 * ## Tokens soportados:
 * - `color-*`   → colores del contenedor
 * - `rounded-*` → borde redondeado
 * - `w-*`       → ancho
 * - `h-*`       → alto
 * - `p-*`       → padding interno
 *
 * La directiva analiza la cadena `epContainer`, extrae los tokens y
 * construye las clases finales mediante `getHostClass()`.
 *
 * @selector `[epContainer], ng-template[epContainer]`
 * @standalone
 */

@Directive({
  selector: '[epContainer], ng-template[epContainer]',
  standalone: true
})
export class EpContainerDirective extends EpDirectives {
  // TODO: Propiedades de inyección
  epContainer = input<EpClass>();

  // TODO: Propiedades (UI)
  private parsed = computed(() => {
    const tokens = (this.epContainer() ?? '').split(/\s+/);
    return {
      color: EpExtractToken(tokens, 'color') as Color,
      rounded: EpExtractToken(tokens, 'rounded') as Rounded,
      heigth: EpExtractToken(tokens, 'h') as Height,
      width: EpExtractToken(tokens, 'w') as Width,
      padding: Number(EpExtractToken(tokens, 'p')) as Padding,
    };
  });

  public containerClass = computed(() =>
    getHostClass({
      color: this.parsed().color,
      rounded: this.parsed().rounded,
      height: this.parsed().heigth,
      width: this.parsed().width,
      padding: this.parsed().padding,
    })
  );

  // TODO: Host
  @HostBinding('class')
  get hostClass() { return this.containerClass(); }
}
