import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: '[epActivator]'
})
export class EpActivatorDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}
