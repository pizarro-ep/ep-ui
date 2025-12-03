import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
  selector: 'ng-template[epFooter]',
  standalone: true
})
export class EpFooterDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}
