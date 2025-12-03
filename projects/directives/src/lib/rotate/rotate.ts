import { computed, Directive, HostBinding, input } from '@angular/core';
import { EpDirectives } from '../init';
import { DefaultRotate } from './theme/config';
import { getHostClass } from './theme/classes';
import { EpExtractToken, EpValidateToken, TYPE_GLOBAL_ANGLES, TYPE_GLOBAL_PHASES } from '@ep/global';

@Directive({
  selector: '[epRotate]',
  standalone: true
})
export class EpRotateDirective extends EpDirectives {
  epRotate = input<string>();

  private parsed = computed(() => {
    const tokens = (this.epRotate() ?? '').split(/\s+/);
    return {
      phase: EpValidateToken(EpExtractToken(tokens, 'phase'), TYPE_GLOBAL_PHASES),
      from: EpValidateToken((EpExtractToken(tokens, 'from')), TYPE_GLOBAL_ANGLES),
      fromX: EpValidateToken((EpExtractToken(tokens, ['from', 'x'])), TYPE_GLOBAL_ANGLES),
      fromY: EpValidateToken((EpExtractToken(tokens, ['from', 'y'])), TYPE_GLOBAL_ANGLES),
      fromZ: EpValidateToken((EpExtractToken(tokens, ['from', 'z'])), TYPE_GLOBAL_ANGLES),
      to: EpValidateToken((EpExtractToken(tokens, 'to')), TYPE_GLOBAL_ANGLES),
      toX: EpValidateToken((EpExtractToken(tokens, ['to', 'x'])), TYPE_GLOBAL_ANGLES),
      toY: EpValidateToken((EpExtractToken(tokens, ['to', 'y'])), TYPE_GLOBAL_ANGLES),
      toZ: EpValidateToken((EpExtractToken(tokens, ['to', 'z'])), TYPE_GLOBAL_ANGLES),
    };
  });

  private hostContainerClass = computed(() => getHostClass({
    phase: this.parsed().phase ?? DefaultRotate.phase,
    from: this.parsed().from,
    fromX: this.parsed().fromX,
    fromY: this.parsed().fromY,
    fromZ: this.parsed().fromZ,
    to: this.parsed().to,
    toX: this.parsed().toX,
    toY: this.parsed().toY,
    toZ: this.parsed().toZ,
  }));

  @HostBinding('class')
  get hostClass() {
    return ['transition-all duration-300 ease-in-out', this.hostContainerClass()].join(' ');
  }
}
