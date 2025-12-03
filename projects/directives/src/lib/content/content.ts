import { Directive, TemplateRef } from '@angular/core';
import { EpDirectives } from '../init';

@Directive({
    selector: 'ng-template[epContent]',
    standalone: true
})
export class EpContentDirective extends EpDirectives {
    constructor(public template: TemplateRef<any>) { super() }
}
