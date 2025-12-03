import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: 'ng-template[epHeader]',
  standalone: true
})
export class EpHeaderDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}
