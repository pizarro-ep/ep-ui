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
  selector: 'app-activator-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode],
  templateUrl: './activator-demo.html',
  styleUrls: ['./activator-demo.css']
})
export class ActivatorDemo {
  public documentation = {
    ...DOCUMENTATION.directives.activator,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epActivator>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epActivator>"),
  }
  public data = [
    {
      prop: "ng-template",
      type: { base: "TemplateRef", options: "any" },
      description: "Contenedor estructural donde se define el contenido que será proyectado por el componente padre.",
      link: { type: "_blank", url: "https://angular.dev/guide/templates/ng-template", text: "ng-template" },
    },
    {
      prop: "epActivator",
      type: "Directive",
      description: "Directiva que marca el ng-template como bloque de acciones para que el componente padre pueda detectarlo y renderizarlo.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ng-template",
      attrs: { epActivator: "$_" },
      children: ["<!-- Proyección de contenido con epActivator -->"],
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpActivatorDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
