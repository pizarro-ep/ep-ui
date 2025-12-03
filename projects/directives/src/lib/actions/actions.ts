import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: 'ng-template[epActions]',
  standalone: true
})
export class EpActionsDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}
