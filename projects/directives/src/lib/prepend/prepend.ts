import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: 'ng-template[epPrepend]',
  standalone: true
})
export class EpPrependDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}