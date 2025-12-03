import { Component, HostBinding, Input } from '@angular/core';
import { EpIconComponent, EpTableComponent } from "@ep/components";
import { EpContainerDirective, EpDividerDirective, EpTableColumnDirective, EpTextDirective, EpTooltipDirective } from "@ep/directives";
import { MAP_PROPS_HEADER } from 'src/app/global/const';

@Component({
  selector: 'app-partial',
  imports: [EpIconComponent, EpTableComponent, EpTextDirective, EpTooltipDirective, EpTableColumnDirective, EpContainerDirective, EpDividerDirective],
  templateUrl: './partial.html',
  styleUrl: './partial.css'
})
export class Partial {
  @Input() data: any[] = [];
  @Input() documentation: any = {};

  public headers = MAP_PROPS_HEADER;

  isArray(value: any) {
    return Array.isArray(value);
  }
  isNumber(value: any) {
    return typeof value === 'number';
  }
  isBoolean(value: any) {
    return typeof value === 'boolean';
  }
  isUndefined(value: any) {
    return typeof value === 'undefined';
  }
  isType(value: any) {
    return !!(["string", "number", "boolean"].find(v => v === value))
  }
  formatText(value: any) {
    if (this.isUndefined(value)) return '';
    if (this.isNumber(value) || this.isBoolean(value)) return value;
    if (this.isArray(value)) return JSON.stringify(value);
    if (value === 'undefined' || value === 'null' || this.isType(value)) return value;
    return `"${value}"`;
  }

  getColorText(value: any) {
    if (this.isNumber(value)) return "color-brand-2";
    if (this.isArray(value)) return "color-warning";
    if (this.isType(value)) return "color-primary";
    if (value === 'undefined' || value === 'null' || this.isBoolean(value)) return 'color-brand';
    return "color-subtitle";
  }
  getTextClass(t: string) {
    const color = t === '🡳' ? 'color-primary' : 'color-subtitle';
    return ["weight-bold", color].join(" ")
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
