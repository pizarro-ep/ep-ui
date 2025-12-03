import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpBuildDocScriptBase, EpBuildNode, EpDedent } from '@ep/global';
import { EpContentDirective, } from '@ep/directives';
import { EpCardComponent, } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-number-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode],
  templateUrl: './number-demo.html',
  styleUrls: ['./number-demo.css']
})
export class NumberDemo {
  public documentation = {
    ...DOCUMENTATION.directives.number,
    usage: DOCUMENTATION.usage.replace("$s", "`epNumber`"),
    props: DOCUMENTATION.props.replace("$s", "`epNumber`"),
  }
  public data = [
    {
      prop: "ng-template",
      type: { base: "TemplateRef", options: "any" },
      description: "Contenedor estructural donde se define el contenido que será proyectado por el componente padre.",
      link: { type: "_blank", url: "https://angular.dev/guide/templates/ng-template", text: "ng-template" },
    },
    {
      prop: "epNumber",
      type: "Directive",
      description: "Directiva que marca el componente para que pueda hacer validación de tipo number cuando se escribe en el input.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "input",
      attrs: { epNumber: "$_" },
      selfClose: true,
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpNumberDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}