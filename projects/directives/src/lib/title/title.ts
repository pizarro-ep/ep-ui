import { Directive, TemplateRef } from "@angular/core";
import { EpDirectives } from "../init";

@Directive({
  selector: 'ng-template[epTitle]',
  standalone: true
})
export class EpTitleDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}

@Directive({
  selector: 'ng-template[epSubTitle]',
  standalone: true
})
export class EpSubTitleDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}