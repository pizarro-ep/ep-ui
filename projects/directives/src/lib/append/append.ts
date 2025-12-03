import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: 'ng-template[epAppend]',
  standalone: true
})
export class EpAppendDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}
