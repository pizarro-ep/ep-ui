import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EpBuildDocScriptBase, EpBuildNode, EpDedent } from '@ep/global';
import { EpContentDirective, } from '@ep/directives';
import { EpCardComponent, } from '@ep/components';
import { DOCUMENTATION } from 'src/app/global/const';
import { Partial } from 'src/app/docs/partial/partial';
import { AppCode } from 'src/app/docs/partial/code';

@Component({
  selector: 'app-column-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, EpCardComponent, EpContentDirective, Partial, AppCode],
  templateUrl: './column-demo.html',
  styleUrls: ['./column-demo.css']
})
export class ColumnDemo {
  public documentation = {
    ...DOCUMENTATION.directives.table.column,
    usage: DOCUMENTATION.usage.replace("$s", "<ng-template epColumn>"),
    props: DOCUMENTATION.props.replace("$s", "<ng-template epColumn>"),
  }
  public data = [
    {
      prop: "ng-template",
      type: { base: "TemplateRef", options: "any" },
      description: "Contenedor estructural donde se define el contenido que será proyectado por el componente padre.",
      link: { type: "_blank", url: "https://angular.dev/guide/templates/ng-template", text: "ng-template" },
    },
    {
      prop: "epColumn !",
      type: "string",
      description: "Directiva que marca el ng-template como bloque de columna de la tabla para que el componente padre pueda detectarlo y renderizarlo. Tener en cuenta que la el valor hace referencia a clave de la columna a renderizar.",
      link: { type: "_blank", url: "https://angular.dev/api/core/Directive", text: "Directive" },
    },
  ];

  get codeTemplate() {
    const raw = {
      tag: "ep-table",
      children: [{
        tag: "ng-template",
        attrs: { epColumn: "columnKey" },
        children: ["<!-- Proyección de contenido con epColumn -->"],
      }]
    };
    return EpDedent(EpBuildNode(raw));
  }

  get codeScript() {
    return EpDedent(EpBuildDocScriptBase({
      imports: [{ from: '@ep/directives', imports: ["EpTableColumnDirective",] }],
      component: 'ExampleComponent',
      body: [],
    }));
  }

  @HostBinding('class')
  get hostClass() { return "contents"; }
}
