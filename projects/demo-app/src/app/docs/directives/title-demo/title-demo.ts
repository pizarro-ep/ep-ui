import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpBuildDocScriptBase, EpBuildNode, EpDedent } from '@ep/global';
import { EpContentDirective, EpActionsDirective } from '@ep/directives';
import { EpCardComponent, EpCheckboxComponent, EpSliderComponent, EpSwitchComponent } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from '../../partial/partial';
import { AppCode } from "../../partial/code";

@Component({
  selector: 'app-title-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode, EpActionsDirective, EpCheckboxComponent, EpSliderComponent, EpSwitchComponent],
  templateUrl: './title-demo.html',
  styleUrls: ['./title-demo.css']
})
export class TitleDemo {
  public type?: boolean;

  public documentation = {
    ...DOCUMENTATION.directives.title,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epTitle> o <ng-template epSubTitle>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epTitle> o <ng-template epSubTitle>"),
  }
  public data = [
    {
      prop: "ng-template",
      type: { base: "TemplateRef", options: "any" },
      description: "Contenedor estructural donde se define el contenido que será proyectado por el componente padre.",
      link: { type: "_blank", url: "https://angular.dev/guide/templates/ng-template", text: "ng-template" },
    },
    {
      prop: "epTitle",
      type: "Directive",
      description: "Directiva que marca el ng-template como bloque de título para que el componente padre pueda detectarlo y renderizarlo.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
    {
      prop: "epSubTitle",
      type: "Directive",
      description: "Directiva que marca el ng-template como bloque de subtítulo para que el componente padre pueda detectarlo y renderizarlo.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ng-template",
      attrs: {
        epTitle: !this.type ? "$_" : undefined,
        epSubTitle: this.type ? "$_" : undefined
      },
      children: [`<!-- Proyección de contenido con ${!this.type ? 'epTitle' : 'epSubTitle'} -->`],
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: [!this.type ? "EpTitleDirective" : "EpSubTitleDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
