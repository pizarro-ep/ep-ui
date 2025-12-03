import { Directive, Input, TemplateRef } from "@angular/core";
import { EpDirectives } from "../init";

@Directive({
  selector: 'ng-template[epColumn]',
  standalone: true
})
export class EpTableColumnDirective extends EpDirectives {
  @Input('epColumn') key!: string;
  constructor(public template: TemplateRef<any>) { super(); }
}

@Directive({
  selector: 'ng-template[epCaption]',
  standalone: true
})
export class EpTableCaptionDirective extends EpDirectives {
  constructor(public template: TemplateRef<any>) { super() }
}

@Directive({
  selector: 'ng-template[epFooter]',
  standalone: true
})
export class EpTableFooterDirective extends EpDirectives {
  @Input() key?: string;
  @Input() colspan?: number = 1;
  constructor(public template: TemplateRef<any>) { super() }
}