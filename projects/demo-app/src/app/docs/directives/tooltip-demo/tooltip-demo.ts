import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpBuildDocScriptBase, EpBuildNode, EpDedent, TYPE_GLOBAL_ANGLES, } from '@ep/global';
import { EpContentDirective, EpActionsDirective, EpTooltipDirective } from '@ep/directives';
import { EpCardComponent, EpButtonComponent, EpInputComponent } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode, EpActionsDirective, EpTooltipDirective, EpButtonComponent, EpInputComponent],
  templateUrl: './tooltip-demo.html',
  styleUrls: ['./tooltip-demo.css']
})
export class TooltipDemo {
  public tooltip?: string = "epTooltip";
  public delay?: number;

  public documentation = {
    ...DOCUMENTATION.directives.tooltip,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epTooltip>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epTooltip>"),
  }

  public data = [
    {
      prop: "epTooltip",
      type: "string",
      default: "",
      description: "Contenido del tooltip que aparecerá al pasar el cursor sobre el elemento.",
      link: {
        type: "_blank",
        url: "https://angular.dev/api/core/Directive",
        text: "Directive"
      },
    },
    {
      prop: "delay",
      type: "number",
      default: 500,
      description: "Tiempo de espera antes de mostrar el tooltip, expresado en milisegundos.",
    },
  ];


  get codeTemplate() {
    const raw = {
      tag: "ep-button",
      attrs: { epTooltip: this.tooltip },
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpTooltipDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
